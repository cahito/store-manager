const productsService = require('../services/productsService');

const NOT_FOUND = 'Product not found';
const NAME_REQUIRED = '"name" is required';
const NAME_LENGTH_SHORT = '"name" length must be at least 5 characters long';

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
      const status = (message === NAME_REQUIRED) ? 400 : 422;

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
    } catch ({ message }) {
      let status = 500;
      const getStatus = () => {
        if (message === NOT_FOUND) status = 404;
        if (message === NAME_REQUIRED) status = 400;
        if (message === NAME_LENGTH_SHORT) status = 422;
      };
      getStatus();

      res.status(status).json({ message });
    }
  },
};

module.exports = productsController;