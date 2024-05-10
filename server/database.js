// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'postgres',
  username: 'postgres',
  password: 'chichore',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

module.exports = { sequelize };
