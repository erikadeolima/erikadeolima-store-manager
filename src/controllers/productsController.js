const express = require('express');
const productMiddleware = require('../middlewares/productsMiddlewares');
const productsService = require('../services/productsService');

const productsController = express.Router();

productsController.put('/:id', productMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productsService.edit(id, name);
  console.log('controller', product);
  if (product === undefined) {
    res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
});

productsController.get('/', async (req, res) => {
  const products = await productsService.consult();
  if (products === undefined) {
    res.status(400).json({ message: 'Product not found' });
  }
  return res.status(200).json(products);
});

productsController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [product] = await productsService.consultById(id);
  if (product === undefined) {
    res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
});

productsController.post('/', productMiddleware, async (req, res) => {
  const { name } = req.body;

  const product = await productsService.insert({ name });

  return res.status(201).json(product);
});

module.exports = productsController;