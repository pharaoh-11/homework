const addTotalPrice = require('./addTotalPrice');
const { discountPromise } = require('./index');

module.exports = (goods) =>
  Promise.all(
    addTotalPrice(goods).map((good) =>
      discountPromise()
        .then((discountPercent) => {
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
        })
        .catch(discountPromise),
    ),
  );
