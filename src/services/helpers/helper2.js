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

module.exports = (goods) => helper3(goods).sort(sortByTotalPrice)[0];
