const mySql = require('mysql2');

const pool = mySql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejs_learn',
  password: 'Radiance345!)',
});

module.exports = pool.promise();
