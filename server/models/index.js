const { Sequelize } = require("sequelize");
const UserModel = require("./user");
const InventoryItemModel = require("./inventoryItem");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

// Initialize models
const User = UserModel(sequelize);
const InventoryItem = InventoryItemModel(sequelize);

// Add associations if needed (optional)
// Example: InventoryItem.belongsTo(User);

sequelize.sync({ alter: true }) // Sync tables to DB
  .then(() => console.log("Database synced!"))
  .catch((err) => console.error("Sync error:", err));

module.exports = {
  sequelize,
  User,
  InventoryItem,
};
