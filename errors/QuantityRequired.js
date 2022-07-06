const { QUANTITY_REQUIRED } = require('../middlewares/errorMessages');

class QuantityRequired extends Error {
  constructor(error) {
    super(error);
    this.message = QUANTITY_REQUIRED;
    this.status = 400;
  }
}

module.exports = QuantityRequired;
