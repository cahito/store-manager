const { expect } = require('chai');
const sinon = require('sinon');

const salesProductsModel = require('../../../models/salesProductsModel');
const connection = require('../../../models/connection');

const {
  mockSales,
  saleToBeInserted,
  saleCreationStatus,
  deleteResultOk,
  deleteResultNotOk,
  editedSale,
} = require('../../db_mock');

describe('Ao chamar o salesProductsModel', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('#create', () => {
    it('a função acessa o recurso de criação de uma nova venda', async () => {
      sinon.stub(connection, 'query').resolves(saleCreationStatus);
      await salesProductsModel.create();

      expect(salesProductsModel).to.respondTo('create');
    });
  });

  describe('#edit', () => {
    it('retorna um objeto com a nova venda adicionada', async () => {
      sinon.stub(connection, 'query').resolves(editedSale);
      const editSale = await salesProductsModel.edit(3, 1, 15);

      expect(salesProductsModel).to.respondTo('create');
      expect(editSale).to.be.eql(editedSale);
    });
  });


});
