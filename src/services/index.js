const serverGoods = require('./goods.json');
const {
  helper1: filterUtil,
  convertObjectValue,
  validate,
  helper2: sortUtil,
  helper3: addPriceKey,
} = require('./helpers');

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
  let goodsArray;
  if (!goods) {
    goodsArray = serverGoods;
  } else {
    goodsArray = goods;
  }
  let filteredGoods = goodsArray;
  if (params.toString() !== '') {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of params.keys()) {
      filteredGoods = filterUtil(filteredGoods, key, convertObjectValue(key, params.get(key)));
    }
  }
  if (filteredGoods.length === 0) {
    return {
      code: 422,
      message: 'There are no results that satisfy your query parameters',
    };
  }
  return {
    code: 200,
    message: JSON.stringify(filteredGoods),
  };
}

function postFilter(body, params) {
  let goodsArray;
  try {
    goodsArray = JSON.parse(body);
    validate(goodsArray);
  } catch (e) {
    return {
      code: 422,
      message: 'The arrays of goods had not pass the validation',
    };
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
  let goodsArray;
  try {
    goodsArray = JSON.parse(body);
    validate(goodsArray);
  } catch (e) {
    return {
      code: 422,
      message: 'The arrays of goods had not pass the validation',
    };
  }
  return {
    code: 200,
    message: JSON.stringify(sortUtil(goodsArray)),
  };
}

function commonPrice() {
  return {
    code: 200,
    message: JSON.stringify(addPriceKey(serverGoods)),
  };
}

function postCommonPrice(body) {
  let goodsArray;
  try {
    goodsArray = JSON.parse(body);
    validate(goodsArray);
  } catch (e) {
    return {
      code: 422,
      message: 'The arrays of goods had not pass the validation',
    };
  }
  return {
    code: 200,
    message: JSON.stringify(addPriceKey(goodsArray)),
  };
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
};
