const sinon = require('sinon');
const { expect } = require('chai');

const {
  consult,
  consultById,
  insert,
  edit,
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

describe('Testes de unidade da camada model', function () {
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

    const result = await edit(productUpdateBody);
    expect(result).to.equal(productUpdateResponse);
  });
  /* 
  Quero testar o metodo de remover, porém preciso inserir algo como um waitFor, pesquisar depois


  it('5-Testa se é possível deletar um produto no db ', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);

    const create = await insert(rightProductBody);
    expect(create).to.be.a('object');

    const insertTest = await consult();
    console.log(insertTest);
    expect(insertTest).to.be.an('array');
    expect(insertTest).to.have.lengthOf(4);
    expect(insertTest).to.equal(allProductsAfterCreateResponse);

    const removeItem = await remove(4);
    expect(removeItem).to.be.a('object');


    const result = await consult();
    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(3);
    expect(result).to.equal(allProductsResponse);
  }); */
});