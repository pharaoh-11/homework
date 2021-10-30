module.exports = (good) => {
  const unitePrice = parseFloat(good[Object.keys(good)[3]].replace('$', ''));
  return {
    ...good,
    price: good[Object.keys(good)[2]] * unitePrice,
  };
};
