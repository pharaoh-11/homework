const addTotalPrice = require('./addTotalPrice');
const randomDiscount = require('./randomDiscount');
const addDiscountField = require('./addDiscountField');

const discountPromise = () =>
  new Promise((resolve) => {
    randomDiscount((err, result) => {
      if (err) return resolve(discountPromise());
      return resolve(result);
    });
  });

module.exports = (goods) =>
  Promise.all(
    addTotalPrice(goods).map((good) =>
      discountPromise().then((discount) => addDiscountField(good, discount)),
    ),
  );
