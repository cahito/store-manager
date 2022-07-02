const { expect } = require('chai');
const {
  nameToBeInserted,
} = require('../db_mock');

const ProductsModel = require('../../../models/productsModel');

describe('Ao acessar os productsModel', () => {
  describe('e usar o "list"', () => {
    it('retorna um array com os todos produtos na DB', async () => {
      const response = await ProductsModel.list();
      
      expect(response).to.be.an('array');
    });
  });

  describe('e acessar "getById" pelo seu "id"', () => {
    it('retorna um objeto do produto com "id" e "name", quando o "id" for válido', async () => {
      const response = await ProductsModel.getById(1);
      
      expect(response).to.be.an('object');
      expect(response).to.have.property('id', 1);
      expect(response).to.have.property('name', 'Martelo de Thor');
    });

    it('retorna "undefined" quando o "id" não existir na DB', async ( )=> {
      const response = await ProductsModel.getById(999);

      expect(response).to.be.undefined;
    });
  });

  describe('e através do "create"', () => {
    it('insere um novo produto quando o "name" passado é válido', async () => {
      const response = await ProductsModel.create(nameToBeInserted);

      expect(response).to.be.equal(4);
    });
  });

});
