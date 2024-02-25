import { Model, DataTypes } from "sequelize";
import * as validations from "../validation/validations";
import * as errors from "../validation/errors";

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            length(value) {
              if (!validations.isLengthValid(value, 2, 255)) {
                throw new Error(errors.nameLength);
              }
            },
          },
        },
        sobrenome: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            length(value) {
              if (!validations.isLengthValid(value, 2, 255)) {
                throw new Error(errors.nameLength);
              }
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: true,
          validate: {
            email(value) {
              if (!validations.isEmailValid(value)) {
                throw new Error(errors.emailValidity);
              }
            },
          },
        },
        idade: {
          type: DataTypes.INTEGER,
          defaultValue: "",
          validate: {
            nonInteger(value) {
              if (!validations.isInteger(value)) {
                throw new Error(errors.ageNonInteger);
              }
            },
          },
        },
        peso: {
          type: DataTypes.FLOAT,
          defaultValue: "",
          validate: {
            nonFloat(value) {
              if (!validations.isNumber(value)) {
                throw new Error(errors.heightNonFloat);
              }
            },
          },
        },
        altura: {
          type: DataTypes.FLOAT,
          defaultValue: "",
          validate: {
            email(value) {
              if (!validations.isNumber(value)) {
                throw new Error(errors.heightNonFloat);
              }
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
