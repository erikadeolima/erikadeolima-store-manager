const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');

/* {
  consultProducts,
  consultProductById,
  insertProducts,
  editProducts,
  removeProducts,
} */

const {
  wrongProductBody,
  wrongSizeProductBody,
  rightProductBody,
  productByIdResponse,
  allProductsResponse,
  productCreateResponse,
  productUpdateBody,
  productUpdateExistsNameBody,
  productSearchNameResponse,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  nonexistentProductIdBody,
  nonexistentProductIdBody2,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  otherProductIdSaleBody,
  rightSaleBody,
  saleCreateResponse,
  productNotFoundResponse,
  productUpdateResponse,
  allProductsAfterCreateResponse,
  allSalesResponse,
  saleByIdResponse,
  saleNotFound,
} = require('../models/mocks/mockData');

describe('Testes de unidade da camada controllers rota /sales', function () {
  afterEach(sinon.restore);
  it('1-Testando retorno rota GET "/sales', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'consult').resolves(allSalesResponse);

    await salesController.consultSales(req, res);

    expect(res.status.calledWith(200)).to.be.true;
  });

  it('2-Testando retorno rota GET "/sales/:id", com id válido', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'consultById').resolves(saleByIdResponse);

    await salesController.consultSalesById(req, res);

    expect(res.status.calledWith(200)).to.be.true;
  });
  /* it('3-Testando retorno rota GET "/sales/:id", com id inválido', async function () {
    const res = {};
    const req = { params: { id: 999 } };

    res.status = sinon.stub().returns();
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'consultById').resolves(productNotFoundResponse);

    await salesController.consultProductById(req, res);
    console.log(res);

    expect(res.status.calledWith(200)).to.be.true;
  }); */
  it('3-Testa se é possível cadastrar um produto no db', async function () {
    const res = {};
    const req = { body: rightSaleBody};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'insert').resolves(productCreateResponse);

    await salesController.insertSales(req, res);

    expect(res.status.calledWith(201)).to.be.true;
  });
  /* it('4-Testa se é possível editar um produto no db ', async function () {
    const res = {};
    const req = { params: {id: 1}, body: productUpdateBody };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'edit').resolves(productUpdateResponse);

    await salesController.editSales(req, res);

    expect(res.status.calledWith(200)).to.be.true;
  }); */
  /* it('5-Testa se é possível deletar um produto no db ', async function () {
    const res = {};
    const req = { params: {id: 1} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'remove').resolves({id: 1});

    await salesController.removeSales(req, res);

    expect(res.status.calledWith(204)).to.be.true;
  }); */
})