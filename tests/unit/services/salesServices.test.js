const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/salesModel');
const {
  consult,
  consultById,
  insert,
} = require('../../../src/services/salesService');

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

describe('Testes de unidade da camada services rota /sales', function () {
  afterEach(sinon.restore);
  it('1-Testando retorno rota GET "/products', async function () {
    sinon.stub(salesModel, 'consult').resolves(allProductsResponse);

    const result = await consult();

    expect(result).to.be.an('array');

    result.forEach((product) => {
      expect(product).to.have.a.property('id');
      expect(product).to.have.a.property('name');
    });

    expect(result).to.be.deep.equal(allProductsResponse);
  });

  it('2-Testando retorno rota GET "/products/:id", com id válido', async function () {
    sinon.stub(salesModel, 'consultById').resolves(saleByIdResponse);

    const result = await consultById(1);
    expect(result).to.be.an('array');

    result.forEach((sale) => {
      expect(sale).to.have.a.property('productId');
      expect(sale).to.have.a.property('quantity');
      expect(sale).to.have.a.property('date');
    });
    
    expect(result).to.be.deep.equal(saleByIdResponse);
  });
  it('3-Testando retorno rota GET "/products/:id", com id inválido', async function () {
    sinon.stub(salesModel, 'consultById').resolves(saleNotFound);

    const result = await consultById(999);

    expect(result).to.be.a('object');
    
    expect(result).to.be.deep.equal(saleNotFound);
  });
  it('4-Testa se é possível cadastrar uma venda no db', async function () {
    sinon.stub(salesModel, 'insert').resolves(saleCreateResponse);

    const result = await insert(rightSaleBody);

    expect(result).to.be.a('object');
    expect(result).to.have.a.property('id');
    expect(result).to.have.a.property('itemsSold');

    expect(result.id).to.equal(saleCreateResponse.id);
  });
  /* it('5-Testa se é possível editar um produto no db ', async function () {
    sinon.stub(salesModel, 'edit').resolves(productUpdateResponse);

    const result = await edit(1, productUpdateBody.name);
    expect(result.id).to.equal(productUpdateResponse.id);
    expect(result.name).to.equal(productUpdateResponse.name);
  });
  it('5-Testa se é possível deletar um produto no db ', async function () {
    sinon.stub(salesModel, 'remove').resolves({id:2});

    const result = await remove(2);
    expect(result.id).to.be.equal(2);
  }); */
})