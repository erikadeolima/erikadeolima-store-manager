const connection = require('./connection');

const consult = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [product] = await connection.execute(query);
  return product;
};

const consultById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id= ?';
  const [product] = await connection.execute(query, [id]);
  return product;
};

module.exports = {
  consult,
  consultById,
};