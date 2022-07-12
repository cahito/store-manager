const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesProductsModel = require('../../../models/salesProductsModel');
const salesService = require('../../../services/salesService');
const {
  SALE_NOT_FOUND,
} = require('../../../middlewares/errorMessages');
const {
  mockSales,
  saleToBeInserted,
  getSaleResult,
} = require('../../db_mock');

describe('Ao chamar o salesService', () => {
  afterEach(async () => {
    sinon.restore();
  });

  describe('#list', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'list').resolves(mockSales);
    });
    afterEach(() => {
      sinon.restore();
    });

    it('retorna um array com as vendas', async () => {
      const items = await salesService.list();

      expect(items).to.be.deep.equal(mockSales);
      expect(items).to.be.an('array');
      expect(salesModel).to.respondTo('list');
    });
  });

  describe('#getById', () => {
    it('retorna a venda identificado por "id"', async () => {
      sinon.stub(salesModel, 'getById').withArgs(1).resolves(mockSales[0]);
      const item = await salesService.getById(1);

      expect(item).to.be.an('object');
      expect(item).to.be.equal(mockSales[0]);
    });

    it('recebe um erro se o "id" não existir no DB', async () => {
      sinon.stub(salesModel, 'getById').withArgs(999).resolves();

      return expect(salesService.getById(999)).to.be.rejectedWith(SALE_NOT_FOUND);
    });
  });

  describe('#getSale', () => {
    it('valida o funcionamento da função interna getSale', async () => {
      sinon.stub(salesModel, 'getSale').withArgs(2).resolves(getSaleResult)

      const result = await salesService.getSale(2)

      expect(result).to.be.eql(getSaleResult);
    });
  });

  describe('#create', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'create').resolves(3);
      sinon.stub(salesProductsModel, 'create').resolves();
      sinon.stub(salesService, 'getSale').withArgs(3).resolves(saleToBeInserted)
    });
  
    it('cria um novo "id" de venda', async () => {
      const newSale = await salesService.create(saleToBeInserted);

      expect(newSale).to.be.an('object').with.property('id', 3);
    });

    it('retorna um objeto com a nova venda adicionada e seu "id"', async () => {
      const newSale = await salesService.create(saleToBeInserted);

      expect(newSale).to.be.eql({ id: 3, itemsSold: saleToBeInserted });
    });
  });

  describe('#delete', () => {
    it('valida que é possível deletar uma venda com sucesso', async () => {
      sinon
        .stub(salesModel, 'delete')
        .withArgs(2)
        .resolves(1);
      const deletedSale = await salesService.delete(2);

      expect(deletedSale).to.be.equal(true);
    });

    it('valida que não é possível deletar uma venda que não existe', async () => {
      sinon.stub(salesModel, 'delete').withArgs(999).resolves();

      return expect(salesService.delete(999)).to.be.rejectedWith(SALE_NOT_FOUND);
    });
  });

  describe('#edit', () => {
    beforeEach(() => {
      sinon.stub(salesProductsModel, 'edit').resolves();
      sinon.stub(salesService, 'getSale').withArgs(1).resolves(saleToBeInserted)
    });

    it('valida que é possível alterar uma venda com sucesso', async () => {
      const editedSale = await salesService.edit(1, saleToBeInserted);

      expect(editedSale).to.be.an('object');
      expect(editedSale).to.have.property('saleId', 1);
      expect(editedSale).to.have.property('itemsUpdated', saleToBeInserted);
    });

    it('valida que não é possível alterar uma venda que não existe', async () => {

      return expect(salesService.edit(999, saleToBeInserted)).to.be.rejectedWith(SALE_NOT_FOUND);
    });
  });
});
