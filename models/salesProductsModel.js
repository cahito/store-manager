const connection = require('./connection');

const salesProductsModel = {
  async create(saleId, productId, quantity) {
    const sql = `
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
    await connection.query(sql, [saleId, productId, quantity]);
  },

  async edit(id, productId, quantity) {
    const sql = `
      UPDATE StoreManager.sales_products
      SET product_id=?, quantity=?
      WHERE sale_id=? AND product_id=?
    `;
    const editedSale = await connection
      .query(sql, [productId, quantity, id, productId]);
    return editedSale;
  },
};

module.exports = salesProductsModel;
