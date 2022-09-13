const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

async function consult() {
  const sales = await salesModel.consult();
  return sales;
}

async function consultById(id) {
  const sales = await salesModel.consultById(id);
    return sales !== [] ? sales : undefined;
}

async function insert(saleInfo) {
  const verification = await Promise.all(
    saleInfo.map(({ productId }) => productsModel.consultById(productId)),
  );
  const isInvalid = verification.some((product) => !product[0]);
  if (isInvalid) {
    return undefined;
  }
  const sales = await salesModel.insert(saleInfo);
  return sales;
}

module.exports = {
  consult,
  consultById,
  insert,
};