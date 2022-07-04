const fs = require('fs');
const path = require('path');
const connection = require('../../models/connection');
const { cwd } = process;

const runSql = (file) => async () => {
  const sql = fs.readFileSync(file, 'utf8');
  await connection.query(sql);
};

const runSeed = runSql(path.resolve(cwd(), 'seed.sql'));

const closeConnection = async () => {
  await connection.end();
};

module.exports = {
  runSeed,
  closeConnection,
};
