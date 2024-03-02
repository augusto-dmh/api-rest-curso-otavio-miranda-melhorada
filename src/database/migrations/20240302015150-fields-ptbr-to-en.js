/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn("alunos", "nome", "name");
    await queryInterface.renameColumn("alunos", "sobrenome", "last_name");
    await queryInterface.renameColumn("alunos", "idade", "age");
    await queryInterface.renameColumn("alunos", "peso", "weight");
    await queryInterface.renameColumn("alunos", "altura", "height");
    await queryInterface.renameColumn("fotos", "aluno_id", "student_id");
    await queryInterface.renameColumn("users", "nome", "name");
  },

  async down(queryInterface) {
    await queryInterface.renameColumn("alunos", "name", "nome");
    await queryInterface.renameColumn("alunos", "last_name", "sobrenome");
    await queryInterface.renameColumn("alunos", "age", "idade");
    await queryInterface.renameColumn("alunos", "weight", "peso");
    await queryInterface.renameColumn("alunos", "height", "altura");
    await queryInterface.renameColumn("users", "name", "nome");
  },
};
