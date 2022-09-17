const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const {
  consult,
  consultById,
  insert,
  edit,
  remove,
} = require('../../../src/services/productsService');

const {
  rightProductBody,
  productByIdResponse,
  productUpdateBody,
  productNotFoundResponse,
  productUpdateResponse,
  allSalesResponse,
  productCreateResponse,
} = require('../models/mocks/mockData');

describe('Testes de unidade da camada services rota /products', function () {
  afterEach(sinon.restore);
  it('1-Testando retorno rota GET "/products', async function () {
    sinon.stub(productsModel, 'consult').resolves(allSalesResponse);

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

  it('2-Testando retorno rota GET "/products/:id", com id válido', async function () {
    sinon.stub(productsModel, 'consultById').resolves(productByIdResponse);

    const result = await consultById(1);

    expect(result[0]).to.be.a('object');
    expect(result[0]).to.have.a.property('id');
    expect(result[0]).to.have.a.property('name');
    
    expect(result).to.be.deep.equal(productByIdResponse);
  });
  it('3-Testando retorno rota GET "/products/:id", com id inválido', async function () {
    sinon.stub(productsModel, 'consultById').resolves(productNotFoundResponse);

    const result = await consultById(999);

    expect(result[0]).to.be.a('object');
    
    expect(result).to.be.deep.equal(productNotFoundResponse);
  });
  it('4-Testa se é possível cadastrar um produto no db', async function () {
    sinon.stub(productsModel, 'insert').resolves(productCreateResponse);

    const result = await insert(rightProductBody);

    expect(result).to.be.a('object');
    expect(result).to.have.a.property('id');
    expect(result).to.have.a.property('name');

    expect(result.name).to.equal(productCreateResponse.name);
  });
  it('5-Testa se é possível editar um produto no db ', async function () {
    sinon.stub(productsModel, 'edit').resolves(productUpdateResponse);

    const result = await edit(1, productUpdateBody.name);
    expect(result.id).to.equal(productUpdateResponse.id);
    expect(result.name).to.equal(productUpdateResponse.name);
  });
  /* 
  Quero testar o metodo de remover, porém preciso inserir algo como um waitFor, pesquisar depois */
  it('5-Testa se é possível deletar um produto no db ', async function () {
    sinon.stub(productsModel, 'remove').resolves({id:2});

    const result = await remove(2);
    expect(result.id).to.be.equal(2);
  });
})