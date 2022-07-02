const connection = require('./connection');

const productsModel = {
  async list() {
    const sql = `
      SELECT *
      FROM StoreManager.products
    `;
    const [list] = await connection.query(sql);
    return list;
  },

  async getById(id) {
    const sql = `
      SELECT *
      FROM StoreManager.products
      WHERE id=?
    `;
    const [[itemById]] = await connection.query(sql, [id]);
    return itemById;
  },

  async create(name) {
    const sql = `
      INSERT INTO StoreManager.products (name)
      VALUES (?)
    `;
    const [{ insertId }] = await connection.query(sql, [name]);
    return insertId;
  },
};

module.exports = productsModel;
