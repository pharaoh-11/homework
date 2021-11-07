module.exports = (key, value) => {
  if (key === 'quantity' || key === 'weight') {
    return Number(value);
  }
  return value;
};
