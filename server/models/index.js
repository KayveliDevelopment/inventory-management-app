const { Sequelize } = require('sequelize');
const config = require('../config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const User = require('./user')(sequelize);
const InventoryItem = require('./inventoryItem')(sequelize);
sequelize.sync({ alter: true });

module.exports = { sequelize, User, InventoryItem };
