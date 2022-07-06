const { NAME_REQUIRED } = require('../middlewares/errorMessages');

class NameRequired extends Error {
  constructor(error) {
    super(error);
    this.message = NAME_REQUIRED;
    this.status = 400;
  }
}

module.exports = NameRequired;
