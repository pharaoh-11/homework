const { Duplex } = require('stream');
const CsvParser = require('../helpers/csvParser');
const validate = require('../helpers/validate');

function getMeasureIndex(good) {
  return Object.keys(good).findIndex(
    (fieldName) => fieldName === 'weight' || fieldName === 'quantity',
  );
}

class CsvToJsonStream extends Duplex {
  optimizedJson = [];

  constructor() {
    super();
    this.csvParser = new CsvParser();
  }

  _write(chunk, _, next) {
    let jsonObjects;
    if (!this.csvParser.isJson(chunk.toString())) {
      jsonObjects = JSON.parse(this.csvParser.csvToJson(chunk.toString()));
    } else {
      jsonObjects = JSON.parse(chunk.toString());
    }
    // let correctJsonObjects = [];
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
        if (
          this.optimizedJson.some(
            (o) =>
              o.item === correctObject.item && o.type === correctObject.type,
          )
        ) {
          const elemIndexForAddition = this.optimizedJson.findIndex(
            (o) =>
              o.item === correctObject.item && o.type === correctObject.type,
          );
          this.optimizedJson[elemIndexForAddition][
            Object.keys(this.optimizedJson[elemIndexForAddition])[
              getMeasureIndex(this.optimizedJson[elemIndexForAddition])
            ]
          ] =
            Number(
              this.optimizedJson[elemIndexForAddition][
                Object.keys(this.optimizedJson[elemIndexForAddition])[
                  getMeasureIndex(this.optimizedJson[elemIndexForAddition])
                ]
              ],
            ) +
            Number(
              correctObject[
                Object.keys(correctObject)[getMeasureIndex(correctObject)]
              ],
            );
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
