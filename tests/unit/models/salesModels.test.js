const sinon = require('sinon');
const { expect } = require('chai');

const {
  consult,
  consultById,
  insert,
} = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');

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
} = require('./mocks/mockData');

describe('Testes de unidade da camada services', function () {
  afterEach(sinon.restore);
  it('1-Testando retorno rota GET "/sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesResponse]);

    const result = await consult();

    expect(result).to.be.an('array');

    result.forEach((sale) => {
      expect(sale).to.have.a.property('saleId');
      expect(sale).to.have.a.property('productId');
      expect(sale).to.have.a.property('quantity');
      expect(sale).to.have.a.property('date');
    });

    expect(result).to.be.deep.equal(allSalesResponse);
  });
  it('2-Testando retorno rota GET "/sales/:id", com id válido', async function () {
    sinon.stub(connection, 'execute').resolves([saleByIdResponse]);

    const result = await consultById(1);

    expect(result).to.be.an('array');

    result.forEach((sale) => {
      expect(sale).to.have.a.property('productId');
      expect(sale).to.have.a.property('quantity');
      expect(sale).to.have.a.property('date');
    });
    
    expect(result).to.be.deep.equal(saleByIdResponse);
  });
  it('3-Testando retorno rota GET "/sales/:id", com id inválido', async function () {
    sinon.stub(connection, 'execute').resolves([saleNotFound]);

    const result = await consultById(999);

    expect(result).to.be.a('object');
    
    expect(result).to.be.deep.equal(saleNotFound);
  });
  /* it('4-Testa se é possível cadastrar uma venda no db', async function () {
    sinon.stub(connection, 'execute').resolves([saleCreateResponse]);

    const result = await insert(rightSaleBody);
    console.log(result);

    expect(result).to.be.a('object');
    expect(result).to.have.a.property('id');
    expect(result).to.have.a.property('itemsSold');

    expect(result).to.equal(saleCreateResponse);
  }); */
});