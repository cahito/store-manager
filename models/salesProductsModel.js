const connection = require('./connection');

const salesProductsModel = {
  async create(saleId, productId, quantity) {
    const sql = `
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
    await connection.query(sql, [saleId, productId, quantity]);
  },
};

module.exports = salesProductsModel;
