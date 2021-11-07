function isWeightBased(good) {
  return good.weight !== 'undefined' && typeof good.pricePerKilo !== 'undefined';
}

module.exports = (goods) => {
  goods.forEach((good) => {
    if (typeof good.item !== 'string') {
      throw new Error('"item" field isn\'t string type');
    }
    if (typeof good.type !== 'string') {
      throw new Error('"type" field isn\'t string type');
    }
    if (!isWeightBased(good) && typeof good.quantity !== 'number') {
      throw new Error('"quantity" field isn\'t number type');
    }
    if (isWeightBased(good) && typeof good.weight !== 'number') {
      throw new Error('"weight" field isn\'t number type');
    }
    if (
      !isWeightBased(good) &&
      typeof good.pricePerItem !== 'string' &&
      Number.isNaN(+good.pricePerItem.replace('$', ''))
    ) {
      throw new Error('"pricePerItem" field has incorrect type');
    }
    if (
      isWeightBased(good) &&
      typeof good.pricePerKilo !== 'string' &&
      Number.isNaN(+good.pricePerKilo.replace('$', ''))
    ) {
      throw new Error('"pricePerKilo" field has incorrect type');
    }
  });
};
