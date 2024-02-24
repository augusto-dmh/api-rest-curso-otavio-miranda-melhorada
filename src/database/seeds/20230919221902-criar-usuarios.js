const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          nome: "Luiz",
          email: "luiz@gmail.com",
          password_hash: await bcrypt.hash("123456", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Luiz 2",
          email: "luiz2@gmail.com",
          password_hash: await bcrypt.hash("654321", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: "Luiz 3",
          email: "luiz3@gmail.com",
          password_hash: await bcrypt.hash("123456789", 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down() {},
};
