const { expect } = require('chai');
const sinon = require('sinon');
const {
  nameToBeInserted,
  mockProducts,
  editedProduct,
  deleteResultOk,
  deleteResultNotOk,
  createdProductId,
} = require('../../db_mock');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('Ao acessar os productsModel', () => {
  afterEach(async  () => {
    sinon.restore();
  });

  describe('e usar o "list"', () => {
    it('retorna um array com os todos produtos na DB', async () => {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      const response = await productsModel.list();

      expect(response).to.be.an('array');
    });
  });

  describe('e acessar "getById" pelo seu "id"', () => {
    it('retorna um objeto do produto com "id" e "name", quando o "id" for válido', async () => {
      sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);
      const response = await productsModel.getById(1);

      expect(response).to.be.an('object');
      expect(response).to.have.property('id', 1);
      expect(response).to.have.property('name', mockProducts[0].name);
    });

    it('retorna "undefined" quando o "id" não existir na DB', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const response = await productsModel.getById(999);

      expect(response).to.be.undefined;
    });
  });

  describe('e através do "create"', () => {
    it('insere um novo produto quando o "name" passado é válido', async () => {
      sinon.stub(connection, 'execute').resolves(createdProductId);
      const response = await productsModel.create(nameToBeInserted);

      expect(response).to.be.equal(4);
    });
  });

  describe('através do "edit"', () => {
    it('altera o produto com o novo "name" passado', async () => {
      sinon.stub(connection, 'execute').resolves();
      sinon.stub(productsModel, 'getById').withArgs(1).resolves(editedProduct);
      const response = await productsModel.edit(1, nameToBeInserted);

      expect(response).to.have.property('id', 1);
      expect(response).to.have.property('name', nameToBeInserted);
    });

    it('não realiza a mudança se o "id" for inválido', async () => {
      sinon.stub(connection, 'execute').resolves();
      sinon.stub(productsModel, 'getById').withArgs(999).resolves();
      const response = await productsModel.edit(999, nameToBeInserted);

      expect(response).to.be.equal(undefined);
    });
  });

  describe('e através do "delete"', () => {
    it('apaga o produto quando o "id" for válido', async () => {
      sinon.stub(connection, 'execute').resolves(deleteResultOk);
      const response = await productsModel.delete(1);

      expect(response).to.be.equal(1);
    });

    it('não apaga o produto quando o "id" não existir na DB', async () => {
      sinon.stub(connection, 'execute').resolves(deleteResultNotOk);
      const response = await productsModel.delete(999);

      expect(response).to.be.equal(0);
    });
  });
});
