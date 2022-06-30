const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('ProductsService', () => {

  describe('#list', () => {
    beforeEach(() => {
      sinon.stub(productsModel, 'list').resolves(['A', 'B', 'C'])
    });

    afterEach(() => {
      productsModel.list.restore();
    });

    it('retorna um array com os produtos', async () => {
      const items = await productsService.list();
      
      expect(items).to.be.deep.equal(['A', 'B', 'C']);
      expect(items).to.be.an('array');
      expect(productsModel).to.respondTo('list');
    });
  });

});
