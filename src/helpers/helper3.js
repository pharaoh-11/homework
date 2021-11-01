function findItemPriceIndex(good) {
  return Object.keys(good).findIndex(
    (fieldName) => fieldName === 'pricePerKilo' || fieldName === 'pricePerItem',
  );
}

function findItemCountIndex(good) {
  return Object.keys(good).findIndex(
    (fieldName) => fieldName === 'quantity' || fieldName === 'weight',
  );
}

module.exports = (good) => {
  const unitePrice = Number(
    good[Object.keys(good)[findItemPriceIndex(good)]].replace('$', ''),
  );
  return {
    ...good,
    price: good[Object.keys(good)[findItemCountIndex(good)]] * unitePrice,
  };
};
