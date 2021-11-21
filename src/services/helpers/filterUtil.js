module.exports = (goodsArray, sortKey, sortValue) =>
  goodsArray.filter((good) => good[sortKey] === sortValue);
