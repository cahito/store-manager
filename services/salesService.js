const salesModel = require('../models/salesModel');

const salesService = {

  /* validateNameExists(name) {
    if (!name) throw new Error('"name" is required');
  },

  validateNameLength(name) {
    if (name.length < 5) throw new Error('"name" length must be at least 5 characters long');
  }, */

  async list() {
    const list = await salesModel.list();

    return list;
  },

  async getById(id) {
    const saleById = await salesModel.getById(id);

    if (!saleById || saleById.length === 0) throw new Error('Sale not found');

    return saleById;
  },

  /* async create(name) {
    const id = await salesModel.create(name);
    return { id, name };
  }, */

  async delete(id) {
    const done = await salesModel.delete(id);

    if (!done || done === 0) throw new Error('Sale not found');

    return true;
  },
};

module.exports = salesService;
