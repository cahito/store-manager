const connection = require('./connection');

const salesModel = {
  async list() {
    const sql = `
      SELECT s.id AS 'saleId', s.date, sp.product_id AS 'productId', sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id=sp.sale_id
      ORDER BY 'saleId', 'productId'
    `;
    const [list] = await connection.query(sql);
    return list;
  },

  async getById(id) {
    const sql = `
      SELECT s.date, sp.product_id AS 'productId', sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON sp.sale_id=s.id
      WHERE sp.sale_id=?
      ORDER BY 'productId'
    `;
    const [itemById] = await connection.query(sql, [Number(id)]);
    return itemById;
  },

  /* async create(name) {
    const sql = `
      INSERT INTO StoreManager.sales (name)
      VALUES (?)
    `;
    const [{ insertId }] = await connection.query(sql, [name]);
    return insertId;
  }, */
};

module.exports = salesModel;
