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

async function edit(id, name) {
  const product = await productsModel.edit(id, name);
  return product.changedRows < 1 ? undefined : { id, name };
}

async function remove(id) {
  const product = await productsModel.remove(id);
  return product.affectedRows < 1 ? undefined : { id };
}

module.exports = {
  consult,
  consultById,
  insert,
  edit,
  remove,
};