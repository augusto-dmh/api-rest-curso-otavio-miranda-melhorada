import { Model, DataTypes } from "sequelize";
import * as validations from "../validation";
import * as errors from "../validation/errors";

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          validate: {
            custom(value) {
              if (!validations.isNotNull(value)) {
                throw errors.models.nameNull;
              }
              if (!validations.isNotEmpty(value)) {
                throw errors.models.nameEmpty;
              }
              if (!validations.isLengthValid(value, 3, 255)) {
                throw errors.models.nameLength;
              }
            },
          },
        },
        sobrenome: {
          type: DataTypes.STRING,
          validate: {
            custom(value) {
              if (!validations.isNotNull(value)) {
                throw errors.models.lastNameNull;
              }
              if (!validations.isNotEmpty(value)) {
                throw errors.models.lastNameEmpty;
              }
              if (!validations.isLengthValid(value, 3, 255)) {
                throw errors.models.lastNameLength;
              }
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          unique: {
            msg: errors.models.emailInUse.message,
          },
          validate: {
            custom(value) {
              if (!validations.isNotNull(value)) {
                throw errors.models.emailNull;
              }
              if (!validations.isNotEmpty(value)) {
                throw errors.models.emailEmpty;
              }
              if (!validations.isEmailValid(value)) {
                throw errors.models.emailValidity;
              }
            },
          },
        },
        idade: {
          type: DataTypes.INTEGER,
          validate: {
            custom(value) {
              if (!validations.isNotNull(value)) {
                throw errors.models.ageNull;
              }
              if (!validations.isNotEmpty(value)) {
                throw errors.models.ageEmpty;
              }
              if (!validations.isInteger(value)) {
                throw errors.models.ageNonInteger;
              }
            },
          },
        },
        peso: {
          type: DataTypes.FLOAT,
          validate: {
            custom(value) {
              if (!validations.isNotNull(value)) {
                throw errors.models.weightNull;
              }
              if (!validations.isNotEmpty(value)) {
                throw errors.models.weightEmpty;
              }
              if (!validations.isNumber(value)) {
                throw errors.models.weightNonFloat;
              }
            },
          },
        },
        altura: {
          type: DataTypes.FLOAT,
          validate: {
            custom(value) {
              if (!validations.isNotNull(value)) {
                throw errors.models.heightNull;
              }
              if (!validations.isNotEmpty(value)) {
                throw errors.models.heightEmpty;
              }
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
