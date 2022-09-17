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

const insert = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES(?)';
  const [product] = await connection.execute(query, [name]);
  return {
    id: product.insertId,
    name,
  };
};

const edit = async (id, name) => {
  /* const validation = await consultById(id); */
  const query = `UPDATE StoreManager.products SET name = '${name}' WHERE id = '${id}'`;
  const [product] = await connection.execute(query);
  return product.changedRows < 1 ? undefined : { id, name };
};

const remove = async (id) => {
  const query = `DELETE FROM StoreManager.products WHERE id = '${id}'`;
  const [product] = await connection.execute(query);
  return product.affectedRows < 1 ? undefined : { id };
};

module.exports = {
  consult,
  consultById,
  insert,
  edit,
  remove,
};