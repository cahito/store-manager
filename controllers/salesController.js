const salesService = require('../services/salesService');

const salesController = {
  async list(_req, res) {
    const list = await salesService.list();

    res.status(200).json(list);
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const itemById = await salesService.getById(id);

      res.status(200).json(itemById);
    } catch ({ message, status }) {
      res.status(status).json({ message });
    }
  },

  async create(req, res) {
    try {
      const productArray = req.body;
      salesService.validateProductId(productArray);
      salesService.validateQuantityNotZero(productArray);
      salesService.validateQuantity(productArray);
      await salesService.validateProductExists(productArray);
      const itemsSold = await salesService.create(productArray);

      res.status(201).json(itemsSold);
    } catch ({ message, status }) {
      res.status(status).json({ message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const done = await salesService.delete(id);

      res.status(204).json(done);
    } catch ({ message, status }) {
      res.status(status).json({ message });
    }
  },

  async edit(req, res) {
    try {
      const { id } = req.params;
      const productArray = req.body;
      console.log('array', productArray, 'id', id);
      salesService.validateProductId(productArray);
      salesService.validateQuantityNotZero(productArray);
      salesService.validateQuantity(productArray);
      await salesService.validateProductExists(productArray);
      const editedSale = await salesService.edit(id, productArray);

      res.status(200).json(editedSale);
    } catch ({ message, status }) {
      res.status(status).json({ message });
    }
  },
};

module.exports = salesController;
