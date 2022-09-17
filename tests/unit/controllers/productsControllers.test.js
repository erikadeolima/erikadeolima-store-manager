const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');

/* {
  consultProducts,
  consultProductById,
  insertProducts,
  editProducts,
  removeProducts,
} */

const {
  rightProductBody,
  productByIdResponse,
  productUpdateBody,
  productNotFoundResponse,
  productUpdateResponse,
  productCreateResponse,
  allSalesResponse,
} = require('../models/mocks/mockData');

describe('Testes de unidade da camada controllers rota /products', function () {
  afterEach(sinon.restore);
  it('1-Testando retorno rota GET "/products', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'consult').resolves(allSalesResponse);

    await productsController.consultProducts(req, res);

    expect(res.status.calledWith(200)).to.be.true;
  });

  it('2-Testando retorno rota GET "/products/:id", com id válido', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'consultById').resolves(productByIdResponse);

    await productsController.consultProductById(req, res);

    expect(res.status.calledWith(200)).to.be.true;
  });
  /* it('3-Testando retorno rota GET "/products/:id", com id inválido', async function () {
    const res = {};
    const req = { params: { id: 999 } };

    res.status = sinon.stub().returns();
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'consultById').resolves(productNotFoundResponse);

    await productsController.consultProductById(req, res);
    console.log(res);

    expect(res.status.calledWith(200)).to.be.true;
  }); */
  it('3-Testa se é possível cadastrar um produto no db', async function () {
    const res = {};
    const req = { body: rightProductBody};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'insert').resolves(productCreateResponse);

    await productsController.insertProducts(req, res);

    expect(res.status.calledWith(201)).to.be.true;
  });
  it('4-Testa se é possível editar um produto no db ', async function () {
    const res = {};
    const req = { params: {id: 1}, body: productUpdateBody };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'edit').resolves(productUpdateResponse);

    await productsController.editProducts(req, res);

    expect(res.status.calledWith(200)).to.be.true;
  });
  /* it('5-Testa se é possível deletar um produto no db ', async function () {
    const res = {};
    const req = { params: {id: 1} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'remove').resolves({id: 1});

    await productsController.removeProducts(req, res);

    expect(res.status.calledWith(204)).to.be.true;
  }); */
})