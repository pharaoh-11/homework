const addTotalPrice = require('./addTotalPrice');
const randomDiscount = require('./randomDiscount');
const addDiscountField = require('./addDiscountField');

const discountCallback = (callback) =>
  randomDiscount((err, result) => {
    if (err) return discountCallback(callback);
    return callback(result);
  });

module.exports = (goods, callback) => {
  const existingDiscounts = [];
  return addTotalPrice(goods).map((good) =>
    discountCallback((discountPercent) => {
      existingDiscounts.push(addDiscountField(good, discountPercent));
      if (existingDiscounts.length === goods.length) {
        callback(null, existingDiscounts);
      }
    }),
  );
};
