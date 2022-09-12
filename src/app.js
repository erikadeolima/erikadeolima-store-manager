const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(bodyParser.json());

app.use('/products', productsController);
app.use('/sales', salesController);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;