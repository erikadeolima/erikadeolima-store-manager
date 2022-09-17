const productsService = require('../services/productsService');

const consultProducts = async (req, res) => {
  const products = await productsService.consult();
  if (products === undefined) {
    res.status(400).json({ message: 'Product not found' });
  }
  return res.status(200).json(products);
};

const consultProductById = async (req, res) => {
  const { id } = req.params;
  const [product] = await productsService.consultById(id);
  if (product === undefined) {
    res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};

const insertProducts = async (req, res) => {
  const { name } = req.body;

  const product = await productsService.insert({ name });
  
  return res.status(201).json(product);
};

const editProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productsService.edit(id, name);
  if (product === undefined) {
    res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};

const removeProducts = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.remove(id);
  if (product === undefined) {
    res.status(404).json({ message: 'Product not found' });
  }
  return res.status(204).end();
};

module.exports = {
  consultProducts,
  consultProductById,
  insertProducts,
  editProducts,
  removeProducts,
};