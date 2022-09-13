const express = require('express');
const salesMiddleware = require('../middlewares/salesMiddlewares');
const salesService = require('../services/salesService');

const salesController = express.Router();

salesController.get('/', async (req, res) => {
  const sales = await salesService.consult();
  if (sales === undefined) {
    res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sales);
});

salesController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.consultById(id);
  if (sale === undefined) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  console.log(sale);
  return res.status(200).json(sale);
});

salesController.post('/', salesMiddleware, async (req, res) => {
  const saleInfo = req.body;
  const sale = await salesService.insert(saleInfo);
  if (sale !== undefined) {
    return res.status(201).json(sale);
  } 
    return res.status(404).json({ message: 'Product not found' });
});

module.exports = salesController;