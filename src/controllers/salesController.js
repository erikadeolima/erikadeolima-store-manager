const salesService = require('../services/salesService');

const consultSales = async (req, res) => {
  const sales = await salesService.consult();
  if (sales === undefined) {
    res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sales);
};

const consultSalesById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.consultById(id);
  
  if (sale === undefined) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(sale);
};

const insertSales = async (req, res) => {
  const saleInfo = req.body;
  const sale = await salesService.insert(saleInfo);
  if (sale !== undefined) {
    return res.status(201).json(sale);
  } 
    return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  consultSales,
  consultSalesById,
  insertSales,
};