const fs = require('fs');
const path = require('path');

const goodsPath = '../../../goods/';

module.exports = () => {
  const goodsFiles = fs.readdirSync(`${__dirname}/${goodsPath}`);
  const latestFileName = `${
    goodsFiles.map((goodsFile) => goodsFile.replace('.json', '')).reverse()[0]
  }.json`;
  return path.normalize(`${__dirname}/${goodsPath}/${latestFileName}`);
};
