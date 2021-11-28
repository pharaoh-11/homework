const addTotalPrice = require('./addTotalPrice');
const randomDiscount = require('./randomDiscount');
const addDiscountField = require('./addDiscountField');

const discountPromise = async () =>
  new Promise((resolve) => {
    randomDiscount((err, result) => {
      if (err) return resolve(discountPromise());
      return resolve(result);
    });
  });

module.exports = async (goods) => {
  let discountPercent;
  return Promise.all(
    addTotalPrice(goods).map(async (good) => {
      discountPercent = await discountPromise();
      return addDiscountField(good, discountPercent);
    }),
  );
};
