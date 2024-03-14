import { Model, DataTypes } from "sequelize";
import * as validations from "../validation";
import * as errors from "../validation/errors";

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.name.empty;
              }
              if (!validations.isLengthValid(value, 3, 255)) {
                throw errors.models.name.invalidLength;
              }
            },
          },
        },
        lastName: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.lastName.empty;
              }
              if (!validations.isLengthValid(value, 3, 255)) {
                throw errors.models.lastName.invalidLength;
              }
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: {
            msg: errors.models.email.inUse,
          },
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.email.empty;
              }
              if (!validations.isEmailValid(value)) {
                throw errors.models.email.invalid;
              }
            },
          },
        },
        age: {
          type: DataTypes.INTEGER,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.age.empty;
              }
              if (!validations.isInteger(value)) {
                throw errors.models.age.nonInteger;
              }
            },
          },
        },
        weight: {
          type: DataTypes.FLOAT,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.weight.empty;
              }
              if (!validations.isNumber(value)) {
                throw errors.models.weight.nonFloat;
              }
            },
          },
        },
        height: {
          type: DataTypes.FLOAT,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.height.empty;
              }
              if (!validations.isNumber(value)) {
                throw errors.models.height.nonFloat;
              }
            },
          },
        },
      },
      {
        sequelize,
        modelName: "student",
      },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.photo, { foreignKey: "studentId" });
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
