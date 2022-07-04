const { expect } = require('chai');
const sinon = require('sinon');
const { runSeed } = require('../utilities');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const {
  mockProducts,
  nameToBeInserted,
} = require('../db_mock');

describe('Ao chamar o productsService', () => {
  beforeEach(async () => {
    await runSeed();
  });
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
    it('retorna um objeto do produto se o "id" for válido', async () => {
      sinon.stub(productsModel, 'getById').withArgs(1).resolves(mockProducts[0]);
      const item = await productsService.getById(1);

      expect(item).to.be.an('object');
      expect(item).to.be.equal(mockProducts[0]);
    });

    it('arremessa um erro se o "id" não for válido', () => {
      // resolução do uso do Chai para captura de erro conforme discussão no
      // Github do chaijs, conforme o link abaixo:
      // https://github.com/chaijs/chai/issues/882#issuecomment-322131680

      return productsService.getById(999)
        .catch((error) => expect(error).to.be.an('error').with.property('message', 'Product not found'));
    });
  });

  describe('#create', () => {
    beforeEach(() => {
      sinon.stub(productsModel, 'create').resolves(4);
    });

    it('cria um novo objeto com "name" passado', async () => {
      const newProduct = await productsService.create(nameToBeInserted);

      expect(newProduct).to.be.an('object').with.property('name', nameToBeInserted);
    });

    it('retorna o novo objeto com "name" passado e um novo "id"', async () => {
      const newProduct = await productsService.create(nameToBeInserted);

      expect(newProduct).to.be.eql({ id: 4, name: nameToBeInserted })
    });
  });

  describe('#validateNameExists', () => {
    it('valida que um "name" existe', () => {
      const validName = () => productsService.validateNameExists(nameToBeInserted);

      expect(validName).to.not.throw('"name" is required');
    });

    it('arremessa um erro se o "name" estiver em branco', () => {
      return productsService.create('')
        .catch((error) => expect(error).to.be.an('error').with.property('message', '"name" is required'));
    });

    it('arremessa um erro se o "name" for undefined', () => {
      const ifExists = () => productsService.validateNameExists(undefined);

      expect(ifExists).to.throw('"name" is required');
    });
  });

  describe('#validateNameLength', () => {
    it('valida que um "name" possui mais de 5 caracteres', () => {
      const validName = () => productsService.validateNameLength(nameToBeInserted);

      expect(validName).to.not.throw('"name" length must be at least 5 characters long');
    });

    it('verifica se o "name" tem mais que 5 caracteres', () => {
      const correctLength = () => productsService.validateNameLength('Anel');

      expect(correctLength).to.throw('"name" length must be at least 5 characters long');
    });
  });

});
