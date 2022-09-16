/* -------------------------- Products --------------------------*/
const wrongProductBody = {};
const wrongSizeProductBody = { name: 'Prod' };
const rightProductBody = { name: 'Produto1' };
const allProductsResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];
const productByIdResponse = [
  { id: 1, name: 'Martelo de Thor' }
];
const productNotFoundResponse = [
  {
  "message": "Product not found"
  }
];
const productCreateResponse = { id: 4, name: 'Produto1' };
const allProductsAfterCreateResponse = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
  { id: 4, name: 'Produto1' },
];
const productUpdateBody = { name: 'Machado do Thor Stormbreaker' };
const productUpdateResponse = { id: 1, name: 'Machado do Thor Stormbreaker' };
const productUpdateExistsNameBody = { name: 'Martelo de Thor' };
const productSearchNameResponse = [{ id: 1, name: 'Martelo de Thor' }];

/* -------------------------- Sales --------------------------*/
const allSalesResponse = [
  {
    "saleId": 1,
    "productId": 1,
    "quantity": 5,
    "date": "2022-09-16T14:45:08.000Z"
  },
  {
    "saleId": 1,
    "productId": 2,
    "quantity": 10,
    "date": "2022-09-16T14:45:08.000Z"
  },
  {
    "saleId": 2,
    "productId": 3,
    "quantity": 15,
    "date": "2022-09-16T14:45:08.000Z"
  }
];
const saleByIdResponse = [
  {
    "productId": 1,
    "quantity": 5,
    "date": "2022-09-16T14:45:08.000Z"
  },
  {
    "productId": 2,
    "quantity": 10,
    "date": "2022-09-16T14:45:08.000Z"
  }
];
const saleNotFound = {
  "message": "Sale not found"
};
const wrongSaleNotProductIdBody = [{ quantity: 1 }];
const wrongSaleNotQuantityBody = [{ productId: 1 }];
const nonexistentProductIdBody = [{ productId: 9999, quantity: 1 }];
const nonexistentProductIdBody2 = [
  { productId: 1, quantity: 1 },
  { productId: 99999, quantity: 5 },
];
const wrongZeroQuantityBody = [{ productId: 1, quantity: 0 }];
const wrongZeroNegativeBody = [{ productId: 1, quantity: -1 }];
const otherProductIdSaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 3, quantity: 5 },
];
const rightSaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];
const saleCreateResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

module.exports = {
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
};