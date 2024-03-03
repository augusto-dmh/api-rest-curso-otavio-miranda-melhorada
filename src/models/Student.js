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
                throw errors.models.name.empty.message;
              }
              if (!validations.isLengthValid(value, 3, 255)) {
                throw errors.models.name.invalidLength.message;
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
                throw errors.models.lastName.empty.message;
              }
              if (!validations.isLengthValid(value, 3, 255)) {
                throw errors.models.lastName.invalidLength.message;
              }
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: {
            msg: errors.models.email.inUse.message,
          },
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.email.empty.message;
              }
              if (!validations.isEmailValid(value)) {
                throw errors.models.email.invalid.message;
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
                throw errors.models.age.empty.message;
              }
              if (!validations.isInteger(value)) {
                throw errors.models.age.nonInteger.message;
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
                throw errors.models.weight.empty.message;
              }
              if (!validations.isNumber(value)) {
                throw errors.models.weight.nonFloat.message;
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
                throw errors.models.height.empty.message;
              }
              if (!validations.isNumber(value)) {
                throw errors.models.height.nonFloat.message;
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
    this.hasMany(models.Photo, { foreignKey: "studentId" });
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
