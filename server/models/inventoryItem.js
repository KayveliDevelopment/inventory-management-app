const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('InventoryItem', {
    name: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING }, 
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.FLOAT, defaultValue: 0.0 },
    description: { type: DataTypes.TEXT },
  });
};
