const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../db.sqlite",
});

(async () => {
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
})();

module.exports = sequelize;
