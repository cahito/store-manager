const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const {
  mockSales,
  saleToBeInserted,
} = require('../../db_mock');

describe('Ao chamar o salesModel', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#list', () => {
    it('retorna um array com as vendas', async () => {
      const items = await salesModel.list();

      expect(items).to.be.an('array');
      expect(salesModel).to.respondTo('list');
    });
  });

  describe('#getById', () => {
    it('retorna a venda identificado por "id"', async () => {
      const item = await salesModel.getById(1);

      expect(item).to.be.an('array');
      expect(salesModel).to.respondTo('getById');
    });

    it('recebe um erro se o "id" não existir no DB', async () => {
      const result = await salesModel.getById(999);

      return expect(result).to.be.eql([]);
    });
  });

  describe('#create', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'getSale').withArgs(3).resolves(saleToBeInserted)
    });

    it('cria um novo "id" de venda', async () => {
      const newSale = await salesModel.create();

      expect(newSale).to.be.an('number');
      expect(newSale).to.be.eq(3);
    });

    it('retorna um objeto com a nova venda adicionada', async () => {
      const newSale = await salesModel.getSale(3);

      expect(newSale).to.be.eql(saleToBeInserted);
    });
  });

  describe('#delete', () => {
    it('valida que é possível deletar uma venda com sucesso', async () => {
      sinon
        .stub(salesModel, 'delete')
        .withArgs(2)
        .resolves(1);
      const deletedSale = await salesModel.delete(2);

      expect(deletedSale).to.be.equal(1);
    });

    it('valida que não é possível deletar uma venda que não existe', async () => {
      const result = await salesModel.delete(999);

      expect(result).to.be.equal(0);
    });
  });

});
