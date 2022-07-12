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

const editedProduct = {
  id: 1,
  name: 'Manopla do Infinito',
};

const createdProductId = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 4,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

const deleteResultOk = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

const deleteResultNotOk = [
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

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

const getSaleResult = {
  productId: 3,
  quantity: 25,
};

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

const saleCreationStatus = [
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 3,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
];

const editedSale = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
  },
  undefined
]

module.exports = {
  mockProducts,
  nameToBeInserted,
  editedProduct,
  createdProductId,
  deleteResultOk,
  deleteResultNotOk,
  mockSales,
  saleToBeInserted,
  saleCreated,
  getSaleResult,
  saleCreationStatus,
  editedSale,
};
