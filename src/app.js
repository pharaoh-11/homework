const {
  helper1: sort,
  helper2: getMostExpensive,
  helper3: addPriceKey,
} = require('./helpers');
const goods = require('../goods.json');

function boot(goodsArray) {
  const goodsWithPrices = goodsArray.map((good) => addPriceKey(good));
  console.log('Goods with added "price" as an object key:');
  console.log(goodsWithPrices);

  console.log('Sorting result by orange is:');
  const oranges = sort(goodsWithPrices, 'item', 'orange');
  console.log(oranges);

  console.log('Sorting result by weight - 4 is:');
  const $4KilogramGoods = sort(goodsWithPrices, 'weight', 4);
  console.log($4KilogramGoods);

  console.log(
    'Here is the most expensive good by the total price from sorted goods:',
  );
  console.log(getMostExpensive([...oranges, ...$4KilogramGoods]));

  console.log('Here is the result of helper3 with 2 results of helper1');
  console.log(
    [...oranges, ...$4KilogramGoods].map((good) => addPriceKey(good)),
  );

  console.log('Here is the results of helper3 function without argument:');
  console.log(getMostExpensive());
}

boot(goods);
