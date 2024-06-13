const { Sequelize, DataTypes, Model } = require('sequelize');

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
  tokens: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
}, {
  timestamps: true 
});

class History extends Model {}
History.init(
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    voice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'History',
  }
);

User.hasMany(History);
History.belongsTo(User);

module.exports = { User, History, sequelize };
