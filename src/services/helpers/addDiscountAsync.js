const addTotalPrice = require('./addTotalPrice');
const randomDiscount = require('./randomDiscount');

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
      discountPercent = await discountPromise(); // .then((discountPercent) => {
      let discountPrice = good.price - (good.price * discountPercent) / 100;
      if (good.item === 'orange' && good.type === 'Tangerine')
        discountPrice -= (discountPrice * discountPercent) / 100;
      if (good.item === 'pineapple' && good.type === 'Red Spanish') {
        discountPrice -= (discountPrice * discountPercent) / 100;
        discountPrice -= (discountPrice * discountPercent) / 100;
      }
      return {
        ...good,
        priceWithDiscount: discountPrice.toFixed(2),
      };
    }),
  );
};
