const addTotalPrice = require('./addTotalPrice');

function sortByTotalPrice(a, b) {
  if (a.price < b.price) {
    return 1;
  }
  if (a.price > b.price) {
    return -1;
  }
  return 0;
}

module.exports = (goods) => addTotalPrice(goods).sort(sortByTotalPrice)[0];
