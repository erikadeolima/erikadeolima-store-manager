// const dateTime = require('node-datetime');
const connection = require('./connection');

/* const saleIdInsert = async () => {
  const dt = dateTime.create().format('Y-m-d H:M:S');
  const [getAllSales] = await connection.execute('SELECT * FROM StoreManager.sales');
  const queryToSale = `INSERT INTO StoreManager.sales 
    (date, id) VALUES (?,?)`;
  const saleId = await connection.execute(queryToSale, [dt, getAllSales.length + 1]);
  return saleId[0].insertId;
}; */

const insert = async (saleInfo) => {
  // const dt = dateTime.create().format('Y-m-d H:M:S');
  const queryToSale = `INSERT INTO StoreManager.sales 
    (date) VALUES (NOW())`;
  const saleId = await connection.execute(queryToSale);
  const id = saleId[0].insertId;
  // const id = await saleIdInsert();
  const queryToProducts = `INSERT INTO StoreManager.sales_products
     (sale_id, quantity, product_id) VALUES (?,?,?)`;
  await Promise.all(saleInfo.map(async ({ quantity, productId }) => {
    const [sale] = await connection.execute(queryToProducts, [id, quantity, productId]);
    return sale;
  }));  
  return {
  id,
  itemsSold: saleInfo,
};
};

module.exports = {
  insert,
};