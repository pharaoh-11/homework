const addTotalPrice = require('./addTotalPrice');
const randomDiscount = require('./randomDiscount');
const addDiscountField = require('./addDiscountField');

const discountAsync = async () =>
  new Promise((resolve) => {
    randomDiscount((err, result) => {
      if (err) return resolve(discountAsync());
      return resolve(result);
    });
  });

module.exports = async (goods) => {
  let discountPercent;
  return Promise.all(
    addTotalPrice(goods).map(async (good) => {
      discountPercent = await discountAsync();
      return addDiscountField(good, discountPercent);
    }),
  );
};
