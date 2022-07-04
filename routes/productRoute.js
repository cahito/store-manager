const Router = require('express');

const productsController = require('../controllers/productsController');

const productRoute = Router();

productRoute.get('/', productsController.list);
productRoute.get('/search', productsController.search);
productRoute.get('/:id', productsController.getById);
productRoute.post('/', productsController.create);
productRoute.put('/:id', productsController.edit);
productRoute.delete('/:id', productsController.delete);

module.exports = productRoute;
