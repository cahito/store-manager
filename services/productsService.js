const productsModel = require('../models/productsModel');
const {
  NAME_REQUIRED,
  NAME_LENGTH_SHORT,
  PRODUCT_NOT_FOUND,
} = require('../middlewares/errorMessages');
const NameRequired = require('../errors/NameRequired');
const NameLengthError = require('../errors/NameLengthError');
const ProductNotFound = require('../errors/ProductNotFound');

const productsService = {
  
  validateNameExists(name) {
    if (!name) throw new NameRequired(NAME_REQUIRED);
  },

  validateNameLength(name) {
    if (name.length < 5) throw new NameLengthError(NAME_LENGTH_SHORT);
  },

  async list() {
    const list = await productsModel.list();

    return list;
  },

  async getById(id) {
    const itemById = await productsModel.getById(id);

    if (!itemById) throw new ProductNotFound(PRODUCT_NOT_FOUND);

    return itemById;
  },

  async create(name) {
    const id = await productsModel.create(name);
    return { id, name };
  },

  async edit(id, name) {
    const editedItem = await productsModel.edit(id, name);

    if (!editedItem || editedItem.length === 0) throw new ProductNotFound(PRODUCT_NOT_FOUND);

    return editedItem;
  },

  async delete(id) {
    const done = await productsModel.delete(id);

    if (!done || done === 0) throw new ProductNotFound(PRODUCT_NOT_FOUND);
    
    return true;
  },

  async search(q) {
    const allProducts = await productsModel.list();
    if (!q) return allProducts;
    const result = allProducts.filter((product) => product.name.includes(q));

    return result;
  },
};

module.exports = productsService;
