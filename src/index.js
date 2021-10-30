(function () {
  countGoodsCost([
    { item: 'apple', type: 'Fuji', weight: 10, pricePerKilo: '$3' },
    { item: 'orange', type: 'Clementine', weight: 6, pricePerKilo: '$7' },
    { item: 'watermelon', type: 'Nova', quantity: 1, pricePerItem: '$5' },
    { item: 'orange', type: 'Navel', weight: 6, pricePerKilo: '$7' },
    { item: 'pineapple', type: 'Queen', quantity: 4, pricePerItem: '$15' },
    { item: 'pineapple', type: 'Pernambuco', quantity: 3, pricePerItem: '$12' },
    { item: 'apple', type: 'Cameo', weight: 6, pricePerKilo: '$7' },
    { item: 'watermelon', type: 'Trio', quantity: 2, pricePerItem: '$9' },
    {
      item: 'pineapple',
      type: 'Red Spanish',
      quantity: 3,
      pricePerItem: '$9.99',
    },
    {
      item: 'watermelon',
      type: 'Millionaire',
      quantity: 2,
      pricePerItem: '$7',
    },
    { item: 'orange', type: 'Tangerine', weight: 4, pricePerKilo: '$4.99' },
    { item: 'apple', type: 'Jazz', weight: 4, pricePerKilo: '$5' },
  ]);
})();

function countGoodsCost(goods) {
  goods.forEach((good) => {
    if (typeof good.item !== 'string') {
      throw `"item" field isn't string type`;
    }
    if (typeof good.type !== 'string') {
      throw `"type" field isn't string type`;
    }
    if (!isWeightBased(good) && typeof good.quantity !== 'number') {
      throw `"quantity" field isn't number type`;
    }
    if (isWeightBased(good) && typeof good.weight !== 'number') {
      throw `"weight" field isn't number type`;
    }
    if (
      !isWeightBased(good) &&
      typeof good.pricePerItem !== 'string' &&
      isNaN(+good.pricePerItem.replace('$', ''))
    ) {
      throw `"pricePerItem" field has incorrect type`;
    }
    if (
      isWeightBased(good) &&
      typeof good.pricePerKilo !== 'string' &&
      isNaN(+good.pricePerKilo.replace('$', ''))
    ) {
      throw `"pricePerKilo" field has incorrect type`;
    }
  });

  const watermelons = goods.filter((good) => good.item === 'watermelon');
  let watermelonsQuantity = 0;
  watermelons.forEach(
    (watermelon) => (watermelonsQuantity += watermelon.quantity),
  );
  console.log(`Watermelons - ${watermelonsQuantity}`);
  console.log('\n************************************\n');

  const apples = goods.filter((good) => good.item === 'apple');
  let applesWeight = 0;
  apples.forEach((apple) => (applesWeight += apple.weight));
  console.log(`Apples - ${applesWeight}`);
  console.log('\n************************************\n');

  console.log(
    goods.sort((a, b) => {
      if (a.item > b.item) {
        return 1;
      }
      if (a.item < b.item) {
        return -1;
      }
      return 0;
    }),
  );
  console.log('\n************************************\n');

  console.log(
    goods.sort((a, b) => {
      if (
        a[Object.keys(a)[2]] * getPrice(a[Object.keys(a)[3]]) >
        b[Object.keys(b)[2]] * getPrice(b[Object.keys(b)[3]])
      ) {
        return 1;
      }
      if (
        a[Object.keys(a)[2]] * getPrice(a[Object.keys(a)[3]]) <
        b[Object.keys(b)[2]] * getPrice(b[Object.keys(b)[3]])
      ) {
        return -1;
      }
      return 0;
    }),
  );
  console.log('\n************************************\n');

  const oranges = goods.filter((good) => good.item === 'orange');
  oranges.sort((a, b) => {
    if (getPrice(a.pricePerKilo) > getPrice(b.pricePerKilo)) {
      return 1;
    }
    if (getPrice(a.pricePerKilo) < getPrice(b.pricePerKilo)) {
      return -1;
    }
    return 0;
  });
  console.log(`The cheapest orange type is: ${oranges[0].type}`);
  console.log('\n************************************\n');

  const pineapples = goods.filter((good) => good.item === 'pineapple');
  const watermelonsCost = getTotalCost(watermelons);
  const applesCost = getTotalCost(apples);
  const orangesCost = getTotalCost(oranges);
  const pineapplesCost = getTotalCost(pineapples);

  console.log(
    `Apples - ${applesCost}, Pineapples - ${pineapplesCost}, Watermelons - ${watermelonsCost}, Oranges - ${orangesCost}`,
  );
  console.log('\n************************************\n');

  const totalCost = watermelonsCost + applesCost + orangesCost + pineapplesCost;
  console.log(`The total cost is ${totalCost}`);
  return totalCost;
}

function getPrice(priseString) {
  return parseFloat(priseString.replace('$', ''));
}

function getTotalCost(goods) {
  let cost = 0;
  goods.forEach((good) => {
    cost += good[Object.keys(good)[2]] * getPrice(good[Object.keys(good)[3]]);
  });
  return cost;
}

function isWeightBased(good) {
  return (
    good.weight !== 'undefined' && typeof good.pricePerKilo !== 'undefined'
  );
}
