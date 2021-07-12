/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mongoose = require('mongoose');

const logger = require('./config/logger');

const app = express();
const port = process.env.PORT || 3000;

const swaggerDocument = YAML.load('./docs/swagger.yaml');
mongoose.Promise = global.Promise;

// Connect to MongoDB database
(async () => {
  try {
    if (!config.has('database')) {
      logger.error('No database config found.');
      process.exit();
    }
    const { host, user, password } = config.get('database');
    const connectionString = `mongodb+srv://${user}:${password}@${host}`;
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('MongoDB connection has been established successfully.');
  } catch (error) {
    logger.error(error.message);
    process.exit();
  }
})();

app.use(morgan('tiny', { stream: logger.stream }));

app.use(express.json());

app.use('/person', require('./person.routes'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500);
  } else {
    res.status(err.statusCode);
  }
  logger.error(err.message);
  res.send('An error occurred.');
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
