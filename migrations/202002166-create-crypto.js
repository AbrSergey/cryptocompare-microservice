module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Crypto', {
      guid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      data: {
        type: Sequelize.JSON,
        allowNull: false
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
