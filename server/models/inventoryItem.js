const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("InventoryItem", {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  });
