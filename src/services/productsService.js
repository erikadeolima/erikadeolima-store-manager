const productsModel = require('../models/productsModel');

async function consult() {
  const products = await productsModel.consult();
  return products;
}

async function consultById(id) {
  const product = await productsModel.consultById(id);
  return product;
}

async function insert({ name }) {
  const product = await productsModel.insert({ name });
  return product;
}

module.exports = {
  consult,
  consultById,
  insert,
};