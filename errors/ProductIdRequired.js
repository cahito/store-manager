const { PRODUCT_ID_REQUIRED } = require('../middlewares/errorMessages');

class ProductIdRequired extends Error {
  constructor(error) {
    super(error);
    this.message = PRODUCT_ID_REQUIRED;
    this.status = 400;
  }
}

module.exports = ProductIdRequired;
