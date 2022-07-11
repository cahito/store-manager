const mockProducts = [
  {
    id: 1,
    name: 'Capa de Levitação',
  },
  {
    id: 2,
    name: 'Armadura Tecnológica Mark XXV',
  },
  {
    id: 3,
    name: 'Bermuda roxa',
  }
];

const nameToBeInserted = 'Manopla do Infinito';

const mockSales = [
  {
    date: "2022-07-06T12:22:37.000Z",
    productId: 1,
    quantity: 3,
    saleId: 1
  },
  {
    date: "2022-07-06T12:22:37.000Z",
    productId: 2,
    quantity: 4,
    saleId: 1
  },
  {
    date: "2022-07-07T22:52:59.000Z",
    productId: 3,
    quantity: 25,
    saleId: 2
  }
];

const saleToBeInserted = [
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 15
  }
];

const saleCreated = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 15
    }
  ]
};

module.exports = {
  mockProducts,
  nameToBeInserted,
  mockSales,
  saleToBeInserted,
  saleCreated,
};
