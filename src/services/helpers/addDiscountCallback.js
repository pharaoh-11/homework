const addTotalPrice = require('./addTotalPrice');
const randomDiscount = require('./randomDiscount');

const discountCallback = (callback) =>
  randomDiscount((err, result) => {
    if (err) return discountCallback(callback);
    return callback(result);
  });

module.exports = (goods, callback) => {
  const existingDiscounts = [];
  addTotalPrice(goods).map((good) =>
    discountCallback((discountPercent) => {
      let discountPrice = good.price - (good.price * discountPercent) / 100;
      if (good.item === 'orange' && good.type === 'Tangerine')
        discountPrice -= (discountPrice * discountPercent) / 100;
      if (good.item === 'pineapple' && good.type === 'Red Spanish') {
        discountPrice -= (discountPrice * discountPercent) / 100;
        discountPrice -= (discountPrice * discountPercent) / 100;
      }
      existingDiscounts.push({
        ...good,
        priceWithDiscount: discountPrice.toFixed(2),
      });
    }),
  );
  if (existingDiscounts.length < goods.length) {
    setTimeout(() => {
      let q;
      return callback(null, existingDiscounts);
    }, 5000);
  } else return callback(null, existingDiscounts);
};
