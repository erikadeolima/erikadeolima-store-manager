const sinon = require('sinon');
const { expect } = require('chai');

const {
  consult,
  consultById,
  insert,
  edit,
  remove,
} = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');

const {
  rightProductBody,
  productByIdResponse,
  allProductsResponse,
  productCreateResponse,
  productUpdateBody,
  productNotFoundResponse,
  productUpdateResponse,
} = require('./mocks/mockData');

describe('Testes de unidade da camada model na rota /products', function () {
  afterEach(sinon.restore);
  it('1-Testando retorno rota GET "/products', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);

    const result = await consult();

    expect(result).to.be.an('array');

    result.forEach((product) => {
      expect(product).to.have.a.property('id');
      expect(product).to.have.a.property('name');
    });

    expect(result).to.be.deep.equal(allProductsResponse);
  });
  it('2-Testando retorno rota GET "/products/:id", com id válido', async function () {
    sinon.stub(connection, 'execute').resolves([productByIdResponse]);

    const result = await consultById(1);

    expect(result[0]).to.be.a('object');
    expect(result[0]).to.have.a.property('id');
    expect(result[0]).to.have.a.property('name');
    
    expect(result).to.be.deep.equal(productByIdResponse);
  });
  it('3-Testando retorno rota GET "/products/:id", com id inválido', async function () {
    sinon.stub(connection, 'execute').resolves([productNotFoundResponse]);

    const result = await consultById(999);

    expect(result[0]).to.be.a('object');
    
    expect(result).to.be.deep.equal(productNotFoundResponse);
  });
  it('4-Testa se é possível cadastrar um produto no db', async function () {
    sinon.stub(connection, 'execute').resolves([productCreateResponse]);

    const result = await insert(rightProductBody);

    expect(result).to.be.a('object');
    expect(result).to.have.a.property('id');
    expect(result).to.have.a.property('name');

    expect(result.name).to.equal(productCreateResponse.name);
  });
  it('5-Testa se é possível editar um produto no db ', async function () {
    sinon.stub(connection, 'execute').resolves([productUpdateResponse]);

    const result = await edit(1, productUpdateBody.name);
    expect(result.id).to.equal(productUpdateResponse.id);
    expect(result.name).to.equal(productUpdateResponse.name);
  });
  it('5-Testa se é possível deletar um produto no db ', async function () {
    sinon.stub(connection, 'execute').resolves([{id:1}]);

    const result = await remove(1);
    
    expect(result.id).to.be.equal(1);
  });
});