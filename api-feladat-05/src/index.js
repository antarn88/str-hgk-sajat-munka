/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const logger = require('./config/logger');

const app = express();
const port = 3000;
const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use(morgan('tiny', { stream: logger.stream }));

app.use(express.json());

app.use('/person', require('./routes'));

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
