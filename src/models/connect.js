const { Sequelize } = require('sequelize');
const pg = require('pg');
const { db } = require('../config');
const logger = require('../helpers/logger');

const {
  user, password, host, port, database: dbName
} = db;

const sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect: 'postgres',
  dialectModule: pg,
  logging: (msg) => logger.silly(msg)
});

module.exports = sequelize;
