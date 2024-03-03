/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(
      "ALTER TABLE users DROP COLUMN password_hash",
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE users ADD password VARCHAR(255) NOT NULL",
    );
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      "ALTER TABLE users ADD password_hash VARCHAR(255) NOT NULL",
    );

    await queryInterface.sequelize.query(
      "ALTER TABLE users DROP COLUMN password",
    );
  },
};
