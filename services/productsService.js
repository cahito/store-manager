const productsModel = require('../models/productsModel');

const productsService = {
  async list() {
    const list = await productsModel.list();

    return list;
  },

  async getById(id) {
    const itemById = await productsModel.getById(id);
    
    if (!itemById || itemById.length === 0) throw new Error('Product not found');

    return itemById;
  },
};

module.exports = productsService;
