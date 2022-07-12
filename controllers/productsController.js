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
    } catch ({ message, status }) {
      res.status(status).json({ message });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      productsService.validateNameExists(name);
      productsService.validateNameLength(name);
      const newProduct = await productsService.create(name);

      res.status(201).json(newProduct);
    } catch ({ message, status }) {
      res.status(status).json({ message });
    }
  },

  async edit(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      productsService.validateNameExists(name);
      productsService.validateNameLength(name);
      const editedItem = await productsService.edit(id, name);

      res.status(200).json(editedItem);
    } catch ({ message, status }) {
      res.status(status).json({ message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const done = await productsService.delete(id);

      res.status(204).json(done);
    } catch ({ message, status }) {
      res.status(status).json({ message });
    }
  },

  async search(req, res) {
    const { q } = req.query;
    const outcome = await productsService.search(q);

    res.status(200).json(outcome);
  },
};

module.exports = productsController;
