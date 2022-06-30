const { expect } = require('chai');

const ProductsModel = require('../../../models/productsModel');

describe('Ao acessar os produtos na DB', () => {

  describe('e listar todos os produtos da DB', () => {
    it('retorna um array com os produtos', async () => {
      const response = await ProductsModel.list();
      
      expect(response).to.be.an('array');
    });
  });

});
