
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('text2speech', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  login: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  timestamps: true 
});

sequelize.sync(); 

module.exports = { User, sequelize };
