const express = require('express');
const salesMiddleware = require('../middlewares/salesMiddlewares');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', salesController.consultSales);
salesRouter.get('/:id', salesController.consultSalesById);
salesRouter.post('/', salesMiddleware, salesController.insertSales);

module.exports = salesRouter;