function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = (callback) => {
  const randomDelay = generateRandomInteger(0, 1000);
  setTimeout(() => {
    const randomDiscount = generateRandomInteger(1, 50);
    if (randomDiscount > 35) {
      return callback(new Error('Something went wrong'));
    }
    return callback(null, randomDiscount);
  }, randomDelay);
};
