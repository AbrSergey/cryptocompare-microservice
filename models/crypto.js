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
    type: {
      type: DataTypes.ENUM('RAW', 'DISPLAY'),
      allowNull: false
    },
    fsymCurrency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tsymCurrency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    CHANGE24HOUR: {
      type: DataTypes.STRING
    },
    CHANGEPCT24HOUR: {
      type: DataTypes.STRING
    },
    OPEN24HOUR: {
      type: DataTypes.STRING
    },
    VOLUME24HOUR: {
      type: DataTypes.STRING
    },
    VOLUME24HOURTO: {
      type: DataTypes.STRING
    },
    LOW24HOUR: {
      type: DataTypes.STRING
    },
    HIGH24HOUR: {
      type: DataTypes.STRING
    },
    PRICE: {
      type: DataTypes.STRING
    },
    LASTUPDATE: {
      type: DataTypes.STRING
    },
    SUPPLY: {
      type: DataTypes.STRING
    },
    MKTCAP: {
      type: DataTypes.STRING
    },
    FROMSYMBOL: {
      type: DataTypes.STRING
    },
    TOSYMBOL: {
      type: DataTypes.STRING
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
