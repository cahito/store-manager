const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const {
  mockProducts,
  nameToBeInserted,
} = require('../db_mock');

describe('Ao chamar o productsController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#list', () => {
    beforeEach(() => {
      sinon.stub(productsService, 'list').resolves(mockProducts);
    });
    afterEach(() => {
      productsService.list.restore();
    });

    it('retorna um array com os produtos', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = {};

      await productsController.list(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockProducts)).to.be.equal(true);
    });
  });
  
  describe('#getById', () => {
    it('retorna o produto identificado por "id"', async () => {
      sinon.stub(productsService, 'getById').withArgs(2).resolves(mockProducts[1]);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 2 };
      req.body = {};

      await productsController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.eq(true);
      expect(res.json.calledWith({
        id: 2,
        name: 'Armadura tecnológica Mark XXV',
      })).to.be.eq(true);
    });

    it('recebe um erro se o "id" não existir no DB', async () => {
      sinon
        .stub(productsService, 'getById')
        .withArgs(999)
        .throws(() => new Error('Product not found'));
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 999 };
      req.body = {};

      await productsController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.eq(true);
      expect(res.json.calledWith({
        message: 'Product not found'
      })).to.be.eq(true);
    });
  });

  describe('#create', () => {
    it('retorna um objeto com o novo item adicionado e seu "id"', async () => {
      sinon
        .stub(productsService, 'create')
        .withArgs(nameToBeInserted)
        .resolves({
          id: 4,
          name: nameToBeInserted,
        });
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = { name: nameToBeInserted };

      await productsController.create(req, res);

      expect(res.status.calledWith(201)).to.be.eq(true);
      expect(res.json.calledWith({
        id: 4,
        name: nameToBeInserted,
      })).to.be.eq(true);
    });

    it('recebe um erro 400 caso o "name" seja undefined ou em branco', async () => {
      const errorMsg = '"name" is required';
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = { name: '' };

      await productsController.create(req, res);

      expect(res.status.calledWith(400)).to.be.eq(true);
      expect(res.json.calledWith({
        message: errorMsg,
      })).to.be.eq(true);
    });

    it('recebe um erro 422 caso o "name" tenha menos de 5 caracteres', async () => {
      const errorMsg = '"name" length must be at least 5 characters long';
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = { name: 'Anel' };

      await productsController.create(req, res);

      expect(res.status.calledWith(422)).to.be.eq(true);
      expect(res.json.calledWith({
        message: errorMsg,
      })).to.be.eq(true);
    });
  });

});
