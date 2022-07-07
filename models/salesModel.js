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
    const [list] = await connection.execute(sql);
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
    const [itemById] = await connection.execute(sql, [Number(id)]);
    return itemById;
  },

  async create() {
    const sql = `
      INSERT INTO StoreManager.sales (date)
      VALUES (NOW())
    `;
    const [{ insertId }] = await connection.execute(sql);
    return insertId;
  },

  async getSale(id) {
    const sql = `
      SELECT sp.product_id AS 'productId', sp.quantity
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON sp.sale_id=s.id
      WHERE sp.sale_id=?
      ORDER BY 'productId'
    `;
    const [newSale] = await connection.execute(sql, [id]);
    return newSale;
  },

  async delete(id) {
    const sql = `
    DELETE FROM sales
    WHERE id=?
    `;
    const [{ affectedRows }] = await connection.execute(sql, [id]);
    return affectedRows;
  },
};

module.exports = salesModel;
