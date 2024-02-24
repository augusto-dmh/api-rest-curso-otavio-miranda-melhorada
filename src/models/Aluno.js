import { Model, DataTypes } from "sequelize";

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Name must be between 3 and 255 characters",
            },
          },
        },
        sobrenome: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Surname must be between 3 and 255 characters",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: {
            msg: "Email already in use",
          },
          validate: {
            isEmail: {
              msg: "Invalid email address",
            },
          },
        },
        idade: {
          type: DataTypes.INTEGER,
          defaultValue: "",
          validate: {
            isInt: {
              msg: "Age must be an integer number",
            },
          },
        },
        peso: {
          type: DataTypes.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "Weight must be a number",
            },
          },
        },
        altura: {
          type: DataTypes.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "Height must be a number",
            },
          },
        },
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: "aluno_id" });
  }
}

// import { Model, DataTypes } from 'sequelize';
// import sequelize from '../database/index';

// class Aluno extends Model { }

// Aluno.init({
//   nome: DataTypes.STRING,
//   sobrenome: DataTypes.STRING,
//   email: DataTypes.STRING,
//   idade: DataTypes.INTEGER,
//   peso: DataTypes.FLOAT,
//   altura: DataTypes.FLOAT,
// }, {
//   sequelize,
// });

// export default Aluno;
