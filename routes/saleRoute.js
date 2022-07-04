const Router = require('express');

const salesController = require('../controllers/salesController');

const saleRoute = Router();

saleRoute.get('/', salesController.list);
saleRoute.get('/:id', salesController.getById);
// saleRoute.post('/', salesController.create);

module.exports = saleRoute;