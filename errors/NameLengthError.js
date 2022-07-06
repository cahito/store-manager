const { NAME_LENGTH_SHORT } = require('../middlewares/errorMessages');

class NameLengthError extends Error {
  constructor(error) {
    super(error);
    this.message = NAME_LENGTH_SHORT;
    this.status = 422;
  }
}

module.exports = NameLengthError;
