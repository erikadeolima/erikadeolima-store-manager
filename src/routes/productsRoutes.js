const express = require('express');
const productsController = require('../controllers/productsController');
const productMiddleware = require('../middlewares/productsMiddlewares');

const productsRouter = express.Router();

productsRouter.get('/', productsController.consultProducts);
productsRouter.get('/:id', productsController.consultProductById);
productsRouter.post('/', productMiddleware, productsController.insertProducts);
productsRouter.put('/:id', productMiddleware, productsController.editProducts);
productsRouter.delete('/:id', productsController.removeProducts);

module.exports = productsRouter;