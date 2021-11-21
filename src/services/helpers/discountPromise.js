const { randomDiscount } = require('./index');

const discountPromise = () =>
  new Promise((resolve, reject) => {
    randomDiscount((err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });

module.exports = discountPromise;
