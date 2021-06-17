/* eslint-disable no-console */
/* eslint-disable global-require */
const yargs = require('yargs');
const { Sum, Avg, Lessthan } = require('./productsService');

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'sum',
    describe: 'Sum all products',
    handler: () => {
      require('./productsService').fileReader((error, productsArray) => {
        if (error) throw error;
        console.log(Sum(productsArray));
      });
    },
  })
  .command({
    command: 'avg',
    describe: 'Avg products prices',
    handler: () => {
      require('./productsService').fileReader((error, productsArray) => {
        if (error) throw error;
        console.log(Avg(productsArray));
      });
    },
  })
  .command({
    command: 'lessthan',
    describe: 'Lessthan',
    handler: ({ count }) => {
      require('./productsService').fileReader((error, productsArray) => {
        if (error) throw error;
        console.log(Lessthan(productsArray, count));
      });
    },
    builder: {
      count: {
        alias: 'c',
        describe: 'Count of products',
        type: 'number',
        demandOption: true,
      },
    },
  })
  .locale('en')
  .strict()
  .help()
  .parse();
