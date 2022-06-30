const connection = require('./connection');

const productsModel = {
  async list() {
    const sql = `
      SELECT *
      FROM StoreManager.products
    `;
    const [list] = await connection.execute(sql);
    return list;
  },

  async getById(id) {
    const sql = `
      SELECT *
      FROM StoreManager.products
      WHERE id=?
    `;
    const [[itemById]] = await connection.execute(sql, [id]);
    return itemById;
  },
};

module.exports = productsModel;
