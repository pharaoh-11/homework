const util = require('util');
const addTotalPrice = require('./addTotalPrice');
const randomDiscount = require('./randomDiscount');

const discountPromisify = () =>
  util
    .promisify(randomDiscount)
    .call(randomDiscount)
    .then((discount) => discount)
    .catch(() => discountPromisify());

module.exports = (goods) =>
  Promise.all(
    addTotalPrice(goods).map((good) =>
      discountPromisify().then((discountPercent) => {
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
    ),
  );
