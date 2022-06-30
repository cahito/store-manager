const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ibdaon00',
  database: 'StoreManager',
});

module.exports = connection;
