const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const salesProductsModel = require('../models/salesProductsModel');
const {
  SALE_NOT_FOUND,
  PRODUCT_ID_REQUIRED,
  QUANTITY_REQUIRED,
  QUANTITY_NOT_ZERO,
  PRODUCT_NOT_FOUND,
} = require('../middlewares/errorMessages');
const ProductIdRequired = require('../errors/ProductIdRequired');
const QuantityRequired = require('../errors/QuantityRequired');
const QuantityNotZero = require('../errors/QuantityNotZero');
const SaleNotFound = require('../errors/SaleNotFound');
const ProductNotFound = require('../errors/ProductNotFound');

const salesService = {

  validateProductId(productArray) {
    productArray.forEach(({ productId }) => {
      if (!productId) throw new ProductIdRequired(PRODUCT_ID_REQUIRED);
    });
  },

  async validateProductExists(productArray) {
    const products = await productsModel.list();
    productArray.forEach(({ productId }) => {
      if (products
        .every(({ id }) => id !== productId)) throw new ProductNotFound(PRODUCT_NOT_FOUND);
    });
  },

  validateQuantityNotZero(productArray) {
    productArray.forEach(({ quantity }) => {
      if (quantity <= 0) throw new QuantityNotZero(QUANTITY_NOT_ZERO);
    });
  },

  validateQuantity(productArray) {
    productArray.forEach(({ quantity }) => {
      if (!quantity) throw new QuantityRequired(QUANTITY_REQUIRED);
    });
  },

  async list() {
    const list = await salesModel.list();

    return list;
  },

  async getById(id) {
    const saleById = await salesModel.getById(id);

    if (!saleById || saleById.length === 0) throw new SaleNotFound(SALE_NOT_FOUND);

    return saleById;
  },

  async getSale(id) {
    const sale = await salesModel.getSale(id);

    return sale;
  },

  async create(productArray) {
    const saleId = await salesModel.create();
    await Promise
      .all(productArray
        .map(({ productId, quantity }) => salesProductsModel.create(saleId, productId, quantity)));
    const itemsSold = await this.getSale(saleId);

    return { id: saleId, itemsSold };
  },

  async delete(id) {
    const done = await salesModel.delete(id);

    if (!done || done === 0) throw new SaleNotFound(SALE_NOT_FOUND);

    return true;
  },

  async edit(id, productArray) {
    const saleToEdit = await this.getSale(id);
    if (!saleToEdit || saleToEdit.length === 0) throw new SaleNotFound(SALE_NOT_FOUND);

    await Promise
      .all(productArray
        .map(({ productId, quantity }) => salesProductsModel.edit(id, productId, quantity)));
    const itemsUpdated = await this.getSale(id);

    return { saleId: id, itemsUpdated };
  },
};

module.exports = salesService;
