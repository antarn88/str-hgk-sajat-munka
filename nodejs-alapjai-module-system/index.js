/* eslint-disable no-console */
const utils = require('./utils');

const dates = [
  new Date('2021-07-03'),
  new Date('1988-08-25'),
  new Date('1981-02-14'),
  new Date('1990-06-10'),
];

const users = [
  {
    firstName: 'József',
    lastName: 'Cserkó',
    age: 26,
  },
  {
    firstName: 'Emánuelle',
    lastName: 'Lakatos',
    age: 12,
  },
  {
    firstName: 'Győző',
    lastName: 'Orbán',
    age: 72,
  },
];

console.log(utils.increaseAndFormatDate(dates));
console.log(utils.generateUserList(users));
console.log(utils.getUserNames(users));
