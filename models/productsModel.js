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

  async create(name) {
    const sql = `
      INSERT INTO StoreManager.products (name)
      VALUES (?)
    `;
    const [{ insertId }] = await connection.execute(sql, [name]);
    return insertId;
  },

  async edit(id, name) {
    const sql = `
      UPDATE StoreManager.products
      SET name=?
      WHERE id=?
    `;
    await connection.execute(sql, [name, id]);
    const editedItem = await this.getById(id);
    return editedItem;
  },

  async delete(id) {
    const sql = `
    DELETE FROM StoreManager.products
    WHERE id=?
    `;
    const [{ affectedRows }] = await connection.execute(sql, [id]);
    return affectedRows;
  },
};

module.exports = productsModel;
