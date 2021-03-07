module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Crypto', {
      guid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      type: {
        type: Sequelize.ENUM(
          'RAW',
          'DISPLAY'
        )
      },
      fsymCurrency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tsymCurrency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CHANGE24HOUR: {
        type: Sequelize.STRING
      },
      CHANGEPCT24HOUR: {
        type: Sequelize.STRING
      },
      OPEN24HOUR: {
        type: Sequelize.STRING
      },
      VOLUME24HOUR: {
        type: Sequelize.STRING
      },
      VOLUME24HOURTO: {
        type: Sequelize.STRING
      },
      LOW24HOUR: {
        type: Sequelize.STRING
      },
      HIGH24HOUR: {
        type: Sequelize.STRING
      },
      PRICE: {
        type: Sequelize.STRING
      },
      LASTUPDATE: {
        type: Sequelize.STRING
      },
      SUPPLY: {
        type: Sequelize.STRING
      },
      MKTCAP: {
        type: Sequelize.STRING
      },
      FROMSYMBOL: {
        type: Sequelize.STRING
      },
      TOSYMBOL: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Crypto');
  }
};
