const { helper1, helper2, helper3 } = require('./helpers');
const goods = require('../goods.json');

function boot(goodsArray) {
  console.log(goodsArray);
}

boot(goods);
