module.exports = (good, discount) => {
  let discountPrice = good.price - (good.price * discount) / 100;
  if (good.item === 'orange' && good.type === 'Tangerine')
    discountPrice -= (discountPrice * discount) / 100;
  if (good.item === 'pineapple' && good.type === 'Red Spanish') {
    discountPrice -= (discountPrice * discount) / 100;
    discountPrice -= (discountPrice * discount) / 100;
  }
  return {
    ...good,
    priceWithDiscount: discountPrice.toFixed(2),
  };
};
