const Router = require('express');

const productsController = require('../controllers/productsController');

const productRoute = Router();

productRoute.get('/', productsController.list);
productRoute.get('/:id', productsController.getById);
productRoute.post('/', productsController.create);
productRoute.put('/:id', productsController.edit);

module.exports = productRoute;
