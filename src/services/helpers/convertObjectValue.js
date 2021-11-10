module.exports = (key, value) => {
  if (['quantity', 'weight'].includes(key)) {
    return Number(value);
  }
  return value;
};
