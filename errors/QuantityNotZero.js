const { QUANTITY_NOT_ZERO } = require('../middlewares/errorMessages');

class QuantityNotZero extends Error {
  constructor(error) {
    super(error);
    this.message = QUANTITY_NOT_ZERO;
    this.status = 422;
  }
}

module.exports = QuantityNotZero;
