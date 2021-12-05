const { Duplex } = require('stream');
const csvParser = require('../helpers/csvParser');
const validate = require('../helpers/validate');

class CsvToJsonStream extends Duplex {
  _write(chunk, _, next) {
    let jsonObjects;
    if (!csvParser.isJson(chunk.toString())) {
      jsonObjects = JSON.parse(csvParser.csvToJson(chunk.toString()));
    } else {
      jsonObjects = JSON.parse(chunk.toString());
    }
    let correctJsonObjects = [];
    try {
      validate(jsonObjects);
      correctJsonObjects = jsonObjects;
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
        correctJsonObjects.push(correctObject);
      }
    }
    this.push(JSON.stringify(correctJsonObjects));
    next();
  }

  _read() {}

  _final() {
    this.push(null);
  }
}

module.exports = CsvToJsonStream;
