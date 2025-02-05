const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Todo = sequelize.define("Todo", {
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Todo;
