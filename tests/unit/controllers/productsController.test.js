const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('Ao chamar o productsController', () => {
  describe('#list', () => {
    beforeEach(() => {
      sinon.stub(productsService, 'list').resolves([1, 2, 3]);
    });
    afterEach(() => {
      productsService.list.restore();
    });

    it('retorna um array com os produtos', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = {};
      req.body = {};

      await productsController.list(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([1, 2, 3])).to.be.equal(true);
    });
  });
});
