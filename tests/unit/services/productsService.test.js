const { expect, use } = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

use(chaiAsPromised);

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const { mockProducts, nameToBeInserted } = require('../db_mock');
const {
  PRODUCT_NOT_FOUND,
  NAME_REQUIRED,
  NAME_LENGTH_SHORT
} = require('../../../middlewares/errorStatus');

describe('Ao chamar o productsService', () => {
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

    it('lança um erro se o "id" não for válido', async () => {
      sinon.stub(productsModel, 'getById').withArgs(999).resolves();

      return expect(productsService.getById(999)).to.be.rejectedWith(PRODUCT_NOT_FOUND);
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

      expect(validName).to.not.throw(NAME_REQUIRED);
    });

    it('lança um erro se o "name" estiver em branco', () => {
      const blankName = () => productsService.validateNameExists('');

      expect(blankName).to.throw(NAME_REQUIRED);
    });

    it('lança um erro se o "name" for undefined', () => {
      const nameUndefined = () => productsService.validateNameExists(undefined);

      expect(nameUndefined).to.throw(NAME_REQUIRED);
    });
  });

  describe('#validateNameLength', () => {
    it('valida que um "name" possui mais de 5 caracteres', () => {
      const validName = () => productsService.validateNameLength(nameToBeInserted);

      expect(validName).to.not.throw(NAME_LENGTH_SHORT);
    });

    it('lança um erro se o "name" não tiver mais que 5 caracteres', () => {
      const correctLength = () => productsService.validateNameLength('Anel');

      expect(correctLength).to.throw(NAME_LENGTH_SHORT);
    });
  });

  describe('#edit', () => {
    it('realiza a edição do produto com o "id" e o "name" passados', async () => {
      sinon
        .stub(productsModel, 'edit')
        .withArgs(1, nameToBeInserted)
        .resolves({
          id: 1,
          name: nameToBeInserted,
        });
      const editedItem = await productsService.edit(1, nameToBeInserted);

      expect(editedItem).to.be.an('object');
      expect(editedItem).to.have.property('name', nameToBeInserted);
    });

    it('lança um erro se o "id" não for válido', async () => {
      sinon
        .stub(productsModel, 'edit')
        .withArgs(4, nameToBeInserted)
        .resolves();
      
      return expect(productsService.edit(999)).to.be.rejectedWith(PRODUCT_NOT_FOUND);
    });
  });

  describe('#delete', () => {
    it('realiza a exclusão do produto com o "id" passados', async () => {
      sinon
        .stub(productsModel, 'delete')
        .withArgs(3)
        .resolves(1);
      const deletedItem = await productsService.delete(3);

      expect(deletedItem).to.be.equal(true);
    });

    it('lança um erro se o "id" não for válido', () => {
      sinon.stub(productsModel, 'getById').withArgs(999).resolves();

      return expect(productsService.delete(999)).to.be.rejectedWith(PRODUCT_NOT_FOUND);
    });
  });

  describe('#search', () => {
    it('realiza a busca do produto com os valores passados', async () => {
      sinon.stub(productsModel, 'list').resolves(mockProducts);
      const searchedItem = await productsService.search('Arma');

      expect(searchedItem).to.be.eql([mockProducts[1]]);
    });

    it('retorna a lista de todos os produtos, se não houverem valores para a pesquisa', async () => {
      sinon.stub(productsModel, 'list').resolves(mockProducts);
      const searchedItem = await productsService.search('');

      expect(searchedItem).to.be.eql(mockProducts);
    });
  });
});
