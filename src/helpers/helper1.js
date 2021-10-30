module.exports = (goodsArray, ...filterKeyValues) => {
  let transitionalArray = goodsArray;
  for (const keyValue of filterKeyValues) {
    transitionalArray = transitionalArray.filter(
      (good) => good[Object.keys(keyValue)[0]] === Object.values(keyValue)[0],
    );
  }
  return transitionalArray;
};
