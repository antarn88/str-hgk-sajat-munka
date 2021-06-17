const fs = require('fs');

const fileReader = (callback) => {
  fs.readFile('./database/products.json', { encoding: 'utf-8' },
    (error, data) => {
      const { products } = JSON.parse(data);
      callback(error, products);
    });
};

const Sum = (productArray) => {
  let sum = 0;
  productArray.forEach((product) => {
    sum += product.price * product.count;
  });
  return sum;
};

const Avg = (productArray) => {
  let sum = 0;
  productArray.forEach((product) => {
    sum += product.price;
  });
  return sum / productArray.length;
};

const Lessthan = (productArray, count) => productArray
  .filter((product) => product.count < count);

module.exports = {
  fileReader,
  Sum,
  Avg,
  Lessthan,
};
