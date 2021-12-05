const fs = require('fs');
const util = require('util');
const serverGoods = require('./goods.json');
const csvParser = require('./helpers/csvParser');
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

async function writeData(req) {
  // let jsonStringBody;
  // try {
  //   if (!csvParser.isJson(body)) {
  //     jsonStringBody = csvParser.csvToJson(body);
  //   } else {
  //     jsonStringBody = body;
  //   }
  //   const jsonData = JSON.parse(jsonStringBody);
  // } catch (e) {
  //   return {
  //     code: 500,
  //     message: `Internal server error\n${e.message}`,
  //   };
  // }

  // const { err } = parseAndValidateGoods(jsonStringBody);
  // if (err) {
  //   return err;
  // }
  // await fs.writeFileSync(`${__dirname}/goods.json`, jsonStringBody);
  return {
    code: 201,
    message: 'The json file was rewritten',
  };
}

function discountPromise(goods = JSON.stringify(serverGoods)) {
  const { err, goodsArray } = parseAndValidateGoods(goods);
  if (err) {
    return Promise.reject(err);
  }
  return addDiscountPromise(goodsArray).then((goodsWithDiscount) => ({
    code: 200,
    message: JSON.stringify(goodsWithDiscount),
  }));
}

function discountPromisify(goods = JSON.stringify(serverGoods)) {
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

async function discountAsync(goods = JSON.stringify(serverGoods)) {
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

function discountCallback(callback, goods = JSON.stringify(serverGoods)) {
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
  discountPromise,
  discountPromisify,
  discountAsync,
  discountCallback,
};
