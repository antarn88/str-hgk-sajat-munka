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

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
