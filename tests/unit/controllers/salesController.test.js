const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const {
  PRODUCT_NOT_FOUND,
  SALE_NOT_FOUND,
  PRODUCT_ID_REQUIRED,
  QUANTITY_REQUIRED,
  QUANTITY_NOT_ZERO,
} = require('../../../middlewares/errorMessages');
const {
  mockSales,
  saleToBeInserted,
  saleCreated,
  mockProducts,
} = require('../../db_mock');
const productsModel = require('../../../models/productsModel');

describe('Ao chamar o salesController', () => {
  afterEach(async () => {
    sinon.restore();
  });

  describe('#list', () => {
    before(() => {
      sinon.stub(salesModel, 'list').resolves(mockSales);
    });
    after(() => {
      sinon.restore();
    });

    it('retorna um array com as vendas', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = {};

      await salesController.list(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockSales)).to.be.equal(true);
    });
  });

  describe('#getById', () => {
    it('retorna a venda identificado por "id"', async () => {
      sinon.stub(salesService, 'getById').withArgs(2).resolves(mockSales[2]);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 2 };
      req.body = {};

      await salesController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.eq(true);
      expect(res.json.calledWith(mockSales[2])).to.be.eq(true);
    });

    it('recebe um erro se o "id" não existir no DB', async () => {
      sinon
        .stub(salesModel, 'getById')
        .withArgs(999)
        .resolves(undefined);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 999 };
      req.body = {};

      await salesController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.eq(true);
      expect(res.json.calledWith({
        message: SALE_NOT_FOUND,
      })).to.be.eq(true);
    });
  });

  describe('#create', () => {
    it('retorna um objeto com a nova venda adicionada e seu "id"', async () => {
      sinon.stub(productsModel, 'list').resolves(mockProducts);
      sinon.stub(salesService, 'create').withArgs(saleToBeInserted).resolves(saleCreated);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = saleToBeInserted;

      await salesController.create(req, res);

      expect(res.status.calledWith(201)).to.be.eq(true);
      expect(res.json.calledWith(saleCreated)).to.be.eq(true);
    });

    it('valida que não é possível realizar operações em uma venda sem o campo "productId"', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = [{ quantity: 5 }, { productId: 2, quantity: 10 }];

      await salesController.create(req, res);

      expect(res.status.calledWith(400)).to.be.eq(true);
      expect(res.json.calledWith({
        message: PRODUCT_ID_REQUIRED,
      })).to.be.eq(true);
    });

    it('valida que não é possível realizar operações em uma venda sem o campo "quantity"', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = [{ productId: 1 }, { productId: 2, quantity: 10 }];

      await salesController.create(req, res);

      expect(res.status.calledWith(400)).to.be.eq(true);
      expect(res.json.calledWith({
        message: QUANTITY_REQUIRED,
      })).to.be.eq(true);
    });

    it('valida que não é possível realizar operações em uma venda'
      + ' com o campo "quantity" igual a zero', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.params = {};
        req.body = [{ productId: 1, quantity: 0 }, { productId: 2, quantity: 10 }];

        await salesController.create(req, res);

        expect(res.status.calledWith(422)).to.be.eq(true);
        expect(res.json.calledWith({
          message: QUANTITY_NOT_ZERO,
        })).to.be.eq(true);
      });

    it('valida que não é possível realizar operações em uma venda'
      + ' com o campo "quantity" menor a zero', async () => {
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.params = {};
        req.body = [{ productId: 1, quantity: -10 }, { productId: 2, quantity: 10 }];

        await salesController.create(req, res);

        expect(res.status.calledWith(422)).to.be.eq(true);
        expect(res.json.calledWith({
          message: QUANTITY_NOT_ZERO,
        })).to.be.eq(true);
      });

    it('valida que não é possível realizar operações em uma venda com o '
      + 'campo "productId" inexistente, em uma requisição com um único item', async () => {
        sinon.stub(productsModel, 'list').resolves(mockProducts);
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.params = {};
        req.body = [{ productId: 999, quantity: 10 }];

        await salesController.create(req, res);

        expect(res.status.calledWith(404)).to.be.eq(true);
        expect(res.json.calledWith({
          message: PRODUCT_NOT_FOUND,
        })).to.be.eq(true);
      });

    it('valida que não é possível realizar operações em uma venda com o '
      + 'campo "productId" inexistente, em uma requisição com vários items', async () => {
        sinon.stub(productsModel, 'list').resolves(mockProducts);
        const req = {};
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        req.params = {};
        req.body = [{ productId: 1, quantity: 10 }, { productId: 999, quantity: 20 }];

        await salesController.create(req, res);

        expect(res.status.calledWith(404)).to.be.eq(true);
        expect(res.json.calledWith({
          message: PRODUCT_NOT_FOUND,
        })).to.be.eq(true);
      });
  });

  describe('#delete', () => {
    it('valida que é possível deletar uma venda com sucesso', async () => {
      sinon.stub(salesModel, 'delete').withArgs(2).resolves(1);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 2 };
      req.body = {};

      await salesController.delete(req, res);

      expect(res.status.calledWith(204)).to.be.eq(true);
      expect(res.json.calledWith()).to.be.eq(true);
    });

    it('valida que não é possível deletar uma venda que não existe', async () => {
      sinon.stub(salesModel, 'delete').withArgs(999).resolves();
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 999 };
      req.body = {};

      await salesController.delete(req, res);

      expect(res.status.calledWith(404)).to.be.eq(true);
      expect(res.json.calledWith({
        message: SALE_NOT_FOUND,
      })).to.be.eq(true);
    });
  });

  describe('#edit', () => {
    it('valida que é possível alterar uma venda com sucesso', async () => {
      sinon.stub(productsModel, 'list').resolves(mockProducts);
      sinon
        .stub(salesService, 'edit')
        .withArgs(1, saleToBeInserted)
        .resolves({
          "saleId": 1,
          "itemsUpdated": saleToBeInserted,
        });
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };
      req.body = saleToBeInserted;

      await salesController.edit(req, res);

      expect(res.status.calledWith(200)).to.be.eq(true);
      expect(res.json.calledWith({
        "saleId": 1,
        "itemsUpdated": saleToBeInserted,
      })).to.be.eq(true);
    });

    it('valida que não é possível alterar uma venda que não existe', async () => {
      sinon.stub(productsModel, 'list').resolves(mockProducts);
      sinon.stub(salesService, 'getSale').withArgs(999).resolves();
      // sinon.stub(salesService, 'edit').withArgs(999, saleToBeInserted).resolves(saleCreated);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 999 };
      req.body = saleToBeInserted;

      await salesController.edit(req, res);

      expect(res.status.calledWith(404)).to.be.eq(true);
      expect(res.json.calledWith({
        message: SALE_NOT_FOUND,
      })).to.be.eq(true);
    });
  });
});
