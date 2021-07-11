/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const port = 3000;

// Instead of body-parser
app.use(express.json());

// Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use('/person', require('./routes'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res, next) => {
  if (!err.statusCode) {
    res.status(500);
  } else {
    res.status(err.statusCode);
  }
  console.error({
    hasError: true,
    message: err.message,
  });
  res.json({
    hasError: true,
    message: 'An error occurred.',
  });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
