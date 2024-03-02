/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameTable("alunos", "students");
    await queryInterface.renameTable("fotos", "photos");
  },

  async down(queryInterface) {
    await queryInterface.renameTable("students", "alunos");
    await queryInterface.renameTable("photos", "fotos");
  },
};
