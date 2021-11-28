const fs = require('fs');
const util = require('util');
const serverGoods = require('./goods.json');
const {
  filterUtil,
  convertObjectValue,
  validateUtil,
  sortUtil,
  addTotalPrice,
  addDiscountPromise,
  addDiscountPromisify,
  addDiscountAsync,
  addDiscountCallback,
} = require('./helpers');

function parseAndValidateGoods(goodsAsString) {
  let goodsArray;
  try {
    goodsArray = JSON.parse(goodsAsString);
    validateUtil(goodsArray);
  } catch (e) {
    return {
      err: {
        code: 422,
        message: `The arrays of goods had not pass the validation\n${e.message}`,
      },
      goodsArray: null,
    };
  }
  return { err: null, goodsArray };
}

function home() {
  return {
    code: 200,
    message: 'hello world',
  };
}

function notFound() {
  return {
    code: 404,
    message: 'page not found',
  };
}

function filter(params, goods) {
  let filteredGoods = goods || serverGoods;
  if (params.toString() !== '') {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of params.keys()) {
      filteredGoods = filterUtil(
        filteredGoods,
        key,
        convertObjectValue(key, params.get(key)),
      );
    }
  }
  if (filteredGoods.length === 0) {
    return {
      code: 204,
      message: 'There are no results that satisfy your query parameters',
    };
  }
  return {
    code: 200,
    message: JSON.stringify(filteredGoods),
  };
}

function postFilter(body, params) {
  const { err, goodsArray } = parseAndValidateGoods(body);
  if (err) {
    return err;
  }
  return filter(params, goodsArray);
}

function topPrice() {
  return {
    code: 200,
    message: JSON.stringify(sortUtil(serverGoods)),
  };
}

function postTopPrice(body) {
  const { err, goodsArray } = parseAndValidateGoods(body);
  if (err) {
    return err;
  }
  return {
    code: 200,
    message: JSON.stringify(sortUtil(goodsArray)),
  };
}

function commonPrice() {
  return {
    code: 200,
    message: JSON.stringify(addTotalPrice(serverGoods)),
  };
}

function postCommonPrice(body) {
  const { err, goodsArray } = parseAndValidateGoods(body);
  if (err) {
    return err;
  }
  return {
    code: 200,
    message: JSON.stringify(addTotalPrice(goodsArray)),
  };
}

async function writeData(body) {
  const { err } = parseAndValidateGoods(body);
  if (err) {
    return err;
  }
  await fs.writeFileSync(`${__dirname}/goods.json`, body);
  return {
    code: 201,
    message: 'The json file was rewritten',
  };
}

function postDiscountPromise(goods) {
  const { err, goodsArray } = parseAndValidateGoods(goods);
  if (err) {
    return new Promise((resolve) => resolve(err));
  }
  return addDiscountPromise(goodsArray).then((goodsWithDiscount) => ({
    code: 200,
    message: JSON.stringify(goodsWithDiscount),
  }));
}

function getDiscountPromise() {
  return addDiscountPromise(serverGoods).then((goodsWithDiscount) => ({
    code: 200,
    message: JSON.stringify(goodsWithDiscount),
  }));
}

function postDiscountPromisify(goods) {
  const { err, goodsArray } = parseAndValidateGoods(goods);
  if (err) {
    return util
      .promisify((resolve) => resolve(err))
      .call((resolve) => resolve(err))
      .catch((error) => error);
  }
  return addDiscountPromisify(goodsArray).then((goodsWithDiscount) => ({
    code: 200,
    message: JSON.stringify(goodsWithDiscount),
  }));
}

function getDiscountPromisify() {
  return addDiscountPromisify(serverGoods).then((goodsWithDiscount) => ({
    code: 200,
    message: JSON.stringify(goodsWithDiscount),
  }));
}

async function postDiscountAsync(goods) {
  const { err, goodsArray } = parseAndValidateGoods(goods);
  if (err) {
    return err;
  }
  const goodsWithDiscount = await addDiscountAsync(goodsArray);
  return {
    code: 200,
    message: JSON.stringify(goodsWithDiscount),
  };
}

async function getDiscountAsync() {
  const goodsWithDiscount = await addDiscountAsync(serverGoods);
  return {
    code: 200,
    message: JSON.stringify(goodsWithDiscount),
  };
}

function getDiscountCallback(callback) {
  return addDiscountCallback(serverGoods, (err, result) =>
    callback(null, {
      code: 200,
      message: JSON.stringify(result),
    }),
  );
}

function postDiscountCallback(goods, callback) {
  const { error, goodsArray } = parseAndValidateGoods(goods);
  if (error) {
    return error;
  }

  return addDiscountCallback(goodsArray, (err, result) =>
    callback(null, {
      code: 200,
      message: JSON.stringify(result),
    }),
  );
}

module.exports = {
  home,
  notFound,
  filter,
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
