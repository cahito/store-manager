const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const { PRODUCT_NOT_FOUND, NAME_REQUIRED, NAME_LENGTH_SHORT } = require('../../../middlewares/errorStatus');
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
      sinon.restore();
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
      expect(res.json.calledWith(mockProducts[1])).to.be.eq(true);
    });

    it('recebe um erro se o "id" não existir no DB', async () => {
      sinon
        .stub(productsService, 'getById')
        .withArgs(999)
        .throws(() => new Error(PRODUCT_NOT_FOUND));
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 999 };
      req.body = {};

      await productsController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.eq(true);
      expect(res.json.calledWith({
        message: PRODUCT_NOT_FOUND,
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
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = { name: '' };

      await productsController.create(req, res);

      expect(res.status.calledWith(400)).to.be.eq(true);
      expect(res.json.calledWith({
        message: NAME_REQUIRED,
      })).to.be.eq(true);
    });

    it('recebe um erro 422 caso o "name" tenha menos de 5 caracteres', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = { name: 'Anel' };

      await productsController.create(req, res);

      expect(res.status.calledWith(422)).to.be.eq(true);
      expect(res.json.calledWith({
        message: NAME_LENGTH_SHORT,
      })).to.be.eq(true);
    });
  });

  describe('#edit', () => {
    it('retorna um objeto com o item alterado e seu "id"', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 3 };
      req.body = { name: 'Bermuda cinza'};

      await productsController.edit(req, res);

      expect(res.status.calledWith(200)).to.be.eq(true);
      expect(res.json.calledWith({
        id: 3,
        name: 'Bermuda cinza',
      })).to.be.eq(true);
    });

    it('retorna que não é possível alterar um produto que não existe', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 4 };
      req.body = { name: 'Manopla Enferrujada' };

      await productsController.edit(req, res);

      expect(res.status.calledWith(404)).to.be.eq(true);
      expect(res.json.calledWith({
        message: PRODUCT_NOT_FOUND,
      })).to.be.eq(true);
    });
    
  });

  describe('#delete', () => {
    it('valida que é possível deletar um produto com sucesso', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 2 };
      req.body = {};

      await productsController.delete(req, res);

      expect(res.status.calledWith(204)).to.be.eq(true);
      expect(res.json.calledWith()).to.be.eq(true);
    });

    it('retorna que não é possível deletar um produto que não existe', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 4 };
      req.body = {};

      await productsController.delete(req, res);

      expect(res.status.calledWith(404)).to.be.eq(true);
      expect(res.json.calledWith({
        message: PRODUCT_NOT_FOUND,
      })).to.be.eq(true);
    });

  });

  describe('#search', () => {
    beforeEach(() => {
      sinon.stub(productsModel, 'list').resolves(mockProducts);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('valida que é possível buscar um produto pelo "name"', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = {};
      req.query = { q: 'rox' };

      await productsController.search(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([mockProducts[2]])).to.be.equal(true);
    });

    it('validado que é possível buscar todos os produtos quando passa a busca vazia', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = {};
      req.query = { q: '' };

      await productsController.search(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockProducts)).to.be.equal(true);
    });

  });
});
