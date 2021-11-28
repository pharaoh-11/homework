const util = require('util');
const addTotalPrice = require('./addTotalPrice');
const randomDiscount = require('./randomDiscount');
const addDiscountField = require('./addDiscountField');

const discountPromisify = () =>
  util
    .promisify(randomDiscount)
    .call(randomDiscount)
    .then((discount) => discount)
    .catch(() => discountPromisify());

module.exports = (goods) =>
  Promise.all(
    addTotalPrice(goods).map((good) =>
      discountPromisify().then((discount) => addDiscountField(good, discount)),
    ),
  );
