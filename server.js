const express = require('express');
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/contacts', require('./routes/contacts'));

// Swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.get('/', (req, res) => {
  res.send('Contacts API Working');
});

mongodb.initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});