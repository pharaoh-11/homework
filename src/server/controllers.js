const services = require('../services');

function home(req, res) {
  const { message, code } = services.home();
  res.write(message);
  res.statusCode = code;
  res.end();
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  res.statusCode = code;
  res.write(message);
  res.end();
}

function getFilter(req, res) {
  const { message, code } = services.filter(req.params);
  res.statusCode = code;
  res.write(message);
  res.end();
}

function postFilter(req, res) {
  const { message, code } = services.postFilter(req.body, req.params);
  res.statusCode = code;
  res.write(message);
  res.end();
}

function topPrice(req, res) {
  const { message, code } = services.topPrice();
  res.statusCode = code;
  res.write(message);
  res.end();
}

function postTopPrice(req, res) {
  const { message, code } = services.postTopPrice(req.body);
  res.statusCode = code;
  res.write(message);
  res.end();
}

function commonPrice(req, res) {
  const { message, code } = services.commonPrice(req.body);
  res.statusCode = code;
  res.write(message);
  res.end();
}

function postCommonPrice(req, res) {
  const { message, code } = services.postCommonPrice(req.body);
  res.statusCode = code;
  res.write(message);
  res.end();
}

async function writeData(req, res) {
  const { message, code } = await services.writeData(req.body);
  res.statusCode = code;
  res.write(message);
  res.end();
}

module.exports = {
  home,
  notFound,
  getFilter,
  postFilter,
  topPrice,
  postTopPrice,
  commonPrice,
  postCommonPrice,
  writeData,
};
