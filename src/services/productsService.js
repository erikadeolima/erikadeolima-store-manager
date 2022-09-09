const productsModel = require('../models/productsModel');

async function consult() {
  const products = await productsModel.consult();
  return products;
}

async function consultById(id) {
  const product = await productsModel.consultById(id);
  return product;
}

module.exports = {
  consult,
  consultById,
};