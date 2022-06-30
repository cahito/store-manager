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
    const { name } = req.body;
    const newProduct = await productsService.create(name);
    res.status(201).json(newProduct);
  },
};

module.exports = productsController;
