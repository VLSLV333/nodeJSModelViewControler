const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodejs_learn', 'root', 'Radiance345!)', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;