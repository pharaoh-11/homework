const addTotalPrice = require('./addTotalPrice');
const randomDiscount = require('./randomDiscount');

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
      discountPromise().then((discountPercent) => {
        let discountPrice = (good.price * discountPercent) / 100;
        if (good.item === 'orange' && good.type === 'Tangerine')
          discountPrice *= discountPercent / 100;
        if (good.item === 'pineapple' && good.type === 'Red Spanish') {
          discountPrice *= discountPercent / 100;
          discountPrice *= discountPercent / 100;
        }
        return {
          ...good,
          priceWithDiscount: discountPrice,
        };
      }),
    ),
  );
