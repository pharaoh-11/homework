const fs = require('fs');
const serverGoods = require('./goods.json');
const {
  filterUtil,
  convertObjectValue,
  validateUtil,
  sortUtil,
  addTotalPrice,
  randomDiscount,
  addDiscountPromise,
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

function getDiscountPromise() {
  return addDiscountPromise(serverGoods).then(
    (goodsWithDiscount) => goodsWithDiscount,
  );

  // randomDiscount((err, discount) => {
  //   if (err) {
  //     return {
  //       code: 500,
  //       message: 'Internal server error',
  //     };
  //   }
  //   return {
  //     code: 201,
  //     message: JSON.stringify(addDiscountPromise(serverGoods, discount)),
  //   };
  // }),
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
};
