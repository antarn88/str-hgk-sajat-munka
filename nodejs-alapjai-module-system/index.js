/* eslint-disable no-console */
const increaseAndFormatDate = require('./utils');

const dates = [
  new Date('2021-07-03'),
  new Date('1988-08-25'),
  new Date('1981-02-14'),
  new Date('1990-06-10'),
];

console.log(increaseAndFormatDate(dates));
