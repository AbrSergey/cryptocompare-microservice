const { Model, DataTypes } = require('sequelize');
const connect = require('./connect');

class Crypto extends Model {}

Crypto.init(
  {
    guid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false
    },
    createdAt: {
      type: 'TIMESTAMP',
      allowNull: false
    }
  },
  {
    sequelize: connect,
    tableName: 'Crypto',
    updatedAt: false
  }
);

module.exports = Crypto;
