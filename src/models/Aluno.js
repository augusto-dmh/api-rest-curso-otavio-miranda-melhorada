import { Model, DataTypes } from "sequelize";
import * as validations from "../validation";
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
                throw errors.models.nameLength;
              }
            },
          },
        },
        sobrenome: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            length(value) {
              }
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: {
            msg: errors.models.emailInUse.message,
          },
          validate: {
            email(value) {
              if (!validations.isEmailValid(value)) {
                throw errors.models.emailValidity;
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
                throw errors.models.ageNonInteger;
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
                throw errors.models.weightNonFloat;
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
                throw errors.models.heightNonFloat;
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
