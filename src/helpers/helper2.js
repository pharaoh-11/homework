const goodsFromJson = require('../../goods.json');
const helper3 = require('./helper3');

function sortByTotalPrice(a, b) {
  if (a.price < b.price) {
    return 1;
  }
  if (a.price > b.price) {
    return -1;
  }
  return 0;
}

module.exports = (goods) => {
  let filledGoodsArray;
  if (!goods) {
    filledGoodsArray = goodsFromJson.map((good) => helper3(good));
  } else {
    filledGoodsArray = goods;
  }
  return filledGoodsArray.sort(sortByTotalPrice)[0];
};
