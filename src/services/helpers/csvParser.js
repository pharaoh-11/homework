function isJson(stringValue) {
  try {
    JSON.parse(stringValue);
  } catch (e) {
    return false;
  }
  return true;
}

function csvToJson(stringValue) {
  const lines = stringValue.split('\n');

  const result = [];

  const headers = lines[0].split(',');

  for (let i = 1; i < lines.length - 1; i++) {
    const obj = {};
    const currentLine = lines[i]
      .replace(/((?<=\$\d)|(?<=\$\d\d)|(?<=\$\d\d\d)|(?<=\$\d\d\d\d)),/g, '.')
      .replace(/"/g, '')
      .split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }

    result.push(obj);
  }

  return JSON.stringify(result);
}

module.exports = { isJson, csvToJson };
