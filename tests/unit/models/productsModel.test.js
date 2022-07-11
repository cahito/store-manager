const { expect } = require('chai');
const sinon = require('sinon');
const { nameToBeInserted } = require('../../db_mock');
const { runSeed } = require('../../utilities');

const ProductsModel = require('../../../models/productsModel');

describe('Ao acessar os productsModel', () => {
  afterEach(async  () => {
    sinon.restore();
    await runSeed();
  });

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

  describe('através do "edit"', () => {
    it('altera o produto com o novo "name" passado', async () => {
      const response = await ProductsModel.edit(1, nameToBeInserted);

      expect(response).to.have.property('id', 1);
      expect(response).to.have.property('name', nameToBeInserted);
    });

    it('não realiza a mudança se o "id" for inválido', async () => {
      const response = await ProductsModel.edit(999, nameToBeInserted);

      expect(response).to.be.equal(undefined);
    });
  });

  describe('e através do "delete"', () => {
    it('apaga o produto quando o "id" for válido', async () => {
      const response = await ProductsModel.delete(1);

      expect(response).to.be.equal(1);
    });

    it('não apaga o produto quando o "id" não existir na DB', async () => {
      const response = await ProductsModel.delete(999);

      expect(response).to.be.equal(0);
    });
  });
});
