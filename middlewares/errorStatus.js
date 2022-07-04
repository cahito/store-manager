const PRODUCT_NOT_FOUND = 'Product not found';
const SALE_NOT_FOUND = 'Sale not found';
const NAME_REQUIRED = '"name" is required';
const NAME_LENGTH_SHORT = '"name" length must be at least 5 characters long';

const getStatus = (message) => {
  let status = 500;
  if (message === PRODUCT_NOT_FOUND) status = 404;
  if (message === SALE_NOT_FOUND) status = 404;
  if (message === NAME_REQUIRED) status = 400;
  if (message === NAME_LENGTH_SHORT) status = 422;

  return status;
};

module.exports = {
  PRODUCT_NOT_FOUND,
  SALE_NOT_FOUND,
  NAME_REQUIRED,
  NAME_LENGTH_SHORT,
  getStatus,
};
