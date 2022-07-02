const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const {
  mockProducts,
  nameToBeInserted,
} = require('../db_mock');

describe('ProductsService', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('#list', () => {
    beforeEach(() => {
      sinon.stub(productsModel, 'list').resolves(mockProducts);
    });

    it('retorna um array com os produtos', async () => {
      const items = await productsService.list();
      
      expect(items).to.be.deep.equal(mockProducts);
      expect(items).to.be.an('array');
      expect(productsModel).to.respondTo('list');
    });
  });

  describe('#getById', () => {
    beforeEach(() => {
      sinon.stub(productsModel, 'getById').resolves(mockProducts[0]);
    });

    it('retorna um objeto do produto se o "id" for válido', async () => {
      const item = await productsService.getById(1);

      expect(item).to.be.an('object');
      expect(item).to.be.equal(mockProducts[0]);

    });

    it('arremessa um erro se o "id" não for válido', async () => {
      const item = await productsService.getById(999);

      expect(item).to.throw('Product not found');
    });
  });
});
