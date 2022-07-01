const productsService = require('../services/productsService');

const productsController = {
  async list(_req, res) {
    const list = await productsService.list();

    res.status(200).json(list);
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const itemById = await productsService.getById(id);
  
      res.status(200).json(itemById);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      productsService.validateNameExists(name);
      productsService.validateNameLength(name);
      const newProduct = await productsService.create(name);
      res.status(201).json(newProduct);
    } catch ({ message }) {
      const status = (message === '"name" is required') ? 400 : 422;
      res.status(status).json({ message });
    }
  },
};

module.exports = productsController;
