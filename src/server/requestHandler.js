const fs = require('fs');
const routes = require('./routes');
const CsvToJsonStream = require('../services/streams/csvToJsonStream');

module.exports = (req, res) => {
  const {
    url,
    headers: { host },
  } = req;

  const { pathname, searchParams } = new URL(url, `https://${host}`);
  const writeableStream = fs.createWriteStream(
    `${__dirname}/../../goods/${new Date().valueOf()}`,
  );
  const tunnel = new CsvToJsonStream();
  req.pipe(tunnel).pipe(writeableStream);
  let body = [];

  req
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      routes({ ...req, pathname, body, params: searchParams }, res);
    });
};
