const { Duplex } = require('stream');
const CsvParser = require('../helpers/csvParser');
const validate = require('../helpers/validate');

function getMeasureIndex(good) {
  return Object.keys(good).findIndex(
    (fieldName) => fieldName === 'weight' || fieldName === 'quantity',
  );
}

function getMeasureFieldName(good) {
  return Object.keys(good)[getMeasureIndex(good)];
}

class CsvToJsonStream extends Duplex {
  optimizedJson = [];

  constructor() {
    super();
    this.csvParser = new CsvParser();
  }

  _isOptimizedArrayHasObject(object) {
    return this.optimizedJson.some(
      (o) => o.item === object.item && o.type === object.type,
    );
  }

  _addGoodMeasure(object) {
    const elemIndexForAddition = this.optimizedJson.findIndex(
      (o) => o.item === object.item && o.type === object.type,
    );
    this.optimizedJson[elemIndexForAddition][
      getMeasureFieldName(this.optimizedJson[elemIndexForAddition])
    ] =
      Number(
        this.optimizedJson[elemIndexForAddition][
          getMeasureFieldName(this.optimizedJson[elemIndexForAddition])
        ],
      ) + Number(object[getMeasureFieldName(object)]);
  }

  _write(chunk, _, next) {
    let jsonObjects;
    if (!this.csvParser.isJson(chunk.toString())) {
      jsonObjects = JSON.parse(this.csvParser.csvToJson(chunk.toString()));
    } else {
      jsonObjects = JSON.parse(chunk.toString());
    }
    try {
      validate(jsonObjects);
      this.optimizedJson = jsonObjects;
    } catch (e) {
      let correctObject;
      // eslint-disable-next-line no-restricted-syntax
      for (const object of jsonObjects) {
        correctObject = {};
        correctObject.item = object.item;
        correctObject.type = object.type;
        if (object.measure === 'quantity') {
          correctObject.quantity = object.measureValue;
        } else if (object.measure === 'weight') {
          correctObject.weight = object.measureValue;
        } else {
          throw new Error('Incorrect csv object measure');
        }
        if (object.priceType === 'pricePerItem') {
          correctObject.pricePerItem = object.priceValue.replace(',', '.');
        } else if (object.priceType === 'pricePerKilo') {
          correctObject.pricePerKilo = object.priceValue.replace(',', '.');
        } else {
          throw new Error('Incorrect csv object priceValue');
        }
        if (this._isOptimizedArrayHasObject(correctObject)) {
          this._addGoodMeasure(correctObject);
        } else {
          this.optimizedJson.push(correctObject);
        }
      }
    }
    next();
  }

  _read() {}

  _final() {
    this.push(JSON.stringify(this.optimizedJson));
  }
}

module.exports = CsvToJsonStream;
