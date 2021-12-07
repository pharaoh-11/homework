class CsvParser {
  cutLine;

  headers;

  firstIteration;

  firstLine = 'item,type,measure,measureValue,priceType,priceValue';

  // eslint-disable-next-line class-methods-use-this
  isJson(stringValue) {
    try {
      JSON.parse(stringValue);
    } catch (e) {
      return false;
    }
    return true;
  }

  csvToJson(stringValue) {
    let obj;
    const isBrokenChunk = !stringValue.endsWith('\n');

    this.firstIteration = 0;
    if (this.cutLine) {
      stringValue = this.cutLine + stringValue;
    }
    const lines = stringValue.split('\n');

    const resultJsonObjects = [];

    if (lines[0] === this.firstLine) {
      this.headers = lines[0].split(',');
      this.firstIteration = 1;
    }

    for (let i = this.firstIteration; i < lines.length - 1; i++) {
      obj = {};

      const currentLine = lines[i]
        .replace(/((?<=\$\d)|(?<=\$\d\d)|(?<=\$\d\d\d)|(?<=\$\d\d\d\d)),/g, '.')
        .replace(/"/g, '')
        .split(',');

      for (let j = 0; j < this.headers.length; j++) {
        obj[this.headers[j]] = currentLine[j];
      }

      resultJsonObjects.push(obj);
    }
    if (isBrokenChunk) {
      this.cutLine = lines[lines.length - 1]
        .replace(/((?<=\$\d)|(?<=\$\d\d)|(?<=\$\d\d\d)|(?<=\$\d\d\d\d)),/g, '.')
        .replace(/"/g, '')
        .split(',');
    } else {
      this.cutLine = undefined;
    }

    return JSON.stringify(resultJsonObjects);
  }
}

// function isJson(stringValue) {
//   try {
//     JSON.parse(stringValue);
//   } catch (e) {
//     return false;
//   }
//   return true;
// }
//
// function csvToJson(stringValue) {
//   const lines = stringValue.split('\n');
//
//   const result = [];
//
//   const headers = lines[0].split(',');
//
//   for (let i = 1; i < lines.length - 1; i++) {
//     const obj = {};
//     const currentLine = lines[i]
//       .replace(/((?<=\$\d)|(?<=\$\d\d)|(?<=\$\d\d\d)|(?<=\$\d\d\d\d)),/g, '.')
//       .replace(/"/g, '')
//       .split(',');
//
//     for (let j = 0; j < headers.length; j++) {
//       obj[headers[j]] = currentLine[j];
//     }
//
//     result.push(obj);
//   }
//
//   return JSON.stringify(result);
// }

module.exports = CsvParser;
