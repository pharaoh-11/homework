const services = require('../services');

function finishResponse(res, message, code) {
  res.write(message);
  res.statusCode = code;
  res.end();
}

function home(req, res) {
  const { message, code } = services.home();
  finishResponse(res, message, code);
}

function notFound(req, res) {
  const { message, code } = services.notFound();
  finishResponse(res, message, code);
}

function getFilter(req, res) {
  const { message, code } = services.filter(req.params);
  finishResponse(res, message, code);
}

function postFilter(req, res) {
  const { message, code } = services.postFilter(req.body, req.params);
  finishResponse(res, message, code);
}

function topPrice(req, res) {
  const { message, code } = services.topPrice();
  finishResponse(res, message, code);
}

function postTopPrice(req, res) {
  const { message, code } = services.postTopPrice(req.body);
  finishResponse(res, message, code);
}

function commonPrice(req, res) {
  const { message, code } = services.commonPrice(req.body);
  finishResponse(res, message, code);
}

function postCommonPrice(req, res) {
  const { message, code } = services.postCommonPrice(req.body);
  finishResponse(res, message, code);
}

async function writeData(req, res) {
  const { message, code } = await services.writeData(req.body);
  finishResponse(res, message, code);
}

function postDiscountPromise(req, res) {
  services
    .postDiscountPromise(req.body)
    .then((result) => finishResponse(res, result.message, result.code));
}

function getDiscountPromise(req, res) {
  services
    .getDiscountPromise()
    .then((result) => finishResponse(res, result.message, result.code));
}

function postDiscountPromisify(req, res) {
  services
    .postDiscountPromisify(req.body)
    .then((result) => finishResponse(res, result.message, result.code));
}

function getDiscountPromisify(req, res) {
  services
    .getDiscountPromisify()
    .then((result) => finishResponse(res, result.message, result.code));
}

async function postDiscountAsync(req, res) {
  const { message, code } = await services.postDiscountAsync(req.body);
  finishResponse(res, message, code);
}

async function getDiscountAsync(req, res) {
  const { message, code } = await services.getDiscountAsync();
  finishResponse(res, message, code);
}

function getDiscountCallback(req, res) {
  services.getDiscountCallback((err, result) => {
    finishResponse(res, result.message, result.code);
  });
}

function postDiscountCallback(req, res) {
  services.postDiscountCallback(req.body, (err, result) => {
    finishResponse(res, result.message, result.code);
  });
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
  getDiscountPromise,
  postDiscountPromise,
  getDiscountPromisify,
  postDiscountPromisify,
  getDiscountAsync,
  postDiscountAsync,
  getDiscountCallback,
  postDiscountCallback,
};
