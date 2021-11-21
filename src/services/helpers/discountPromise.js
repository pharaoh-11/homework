const { randomDiscount } = require('./index');

const discountPromise = () =>
  new Promise((resolve) => {
    randomDiscount((err, result) => {
      if (err) return resolve(discountPromise());
      return resolve(result);
    });
  });

module.exports = discountPromise;
