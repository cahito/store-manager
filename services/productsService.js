const productsModel = require('../models/productsModel');

const productsService = {
  
  validateNameExists(name) {
    if (!name) throw new Error('"name" is required');
  },

  validateNameLength(name) {
    if (name.length < 5) throw new Error('"name" length must be at least 5 characters long');
  },

  async list() {
    const list = await productsModel.list();

    return list;
  },

  async getById(id) {
    const itemById = await productsModel.getById(id);

    if (!itemById || itemById.length === 0) throw new Error('Product not found');

    return itemById;
  },

  async create(name) {
    const id = await productsModel.create(name);
    return { id, name };
  },

  async edit(id, name) {
    const editedItem = await productsModel.edit(id, name);

    if (!editedItem || editedItem.length === 0) throw new Error('Product not found');

    return editedItem;
  },

  async delete(id) {
    const done = await productsModel.delete(id);

    if (!done || done === 0) throw new Error('Product not found');
    
    return true;
  },
};

module.exports = productsService;
