const { PRODUCT_NOT_FOUND } = require('../middlewares/errorMessages');

class ProductNotFound extends Error {
  constructor(error) {
    super(error);
    this.message = PRODUCT_NOT_FOUND;
    this.status = 404;
  }
}

module.exports = ProductNotFound;
