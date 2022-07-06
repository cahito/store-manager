const { SALE_NOT_FOUND } = require('../middlewares/errorMessages');

class SaleNotFound extends Error {
  constructor(error) {
    super(error);
    this.message = SALE_NOT_FOUND;
    this.status = 404;
  }
}

module.exports = SaleNotFound;
