const express = require('express');
// const { productSchema } = require('../middlewares/productsMiddlewares');
const productsService = require('../services/productsService');

const productsController = express.Router();

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

productsController.post('/', async (req, res) => {
  const { name } = req.body;

  const product = await productsService.insert({ name });

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({
      message: '"name" length must be at least 5 characters long',
    });
  }
  return res.status(201).json(product);
});

module.exports = productsController;