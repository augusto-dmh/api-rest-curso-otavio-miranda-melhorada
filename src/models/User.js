import { Model, DataTypes } from "sequelize";
import bcryptjs from "bcryptjs";
import * as validations from "../validation/validations";
import * as errors from "../validation/errors";

export default class User extends Model {
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
        email: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: { msg: "Email already in use." },
          validate: {
            email(value) {
              if (!validations.isEmailValid(value)) {
                throw new Error(errors.emailValidity);
              }
            },
          },
        },
        password_hash: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        password: {
          type: DataTypes.VIRTUAL,
          defaultValue: "",
          validate: {
            length(value) {
              if (!validations.isLengthValid(value, 6, 60)) {
                throw new Error(errors.passwordLength);
              }
            },
          },
        },
      },
      {
        sequelize,
      },
    );

    this.addHook("beforeSave", async (user) => {
      if (!user.password) return;
      user.password_hash = await bcryptjs.hash(user.password, 8);
    });

    return this;
  }
}

// import { Model, DataTypes } from 'sequelize';
// import bcryptjs from 'bcryptjs';
// import sequelize from '../database/index';

// class User extends Model { }

// User.init({
//   nome: {
//     type: DataTypes.STRING,
//     defaultValue: '',
//     validate: {
//       len: {
//         args: [3, 255],
//         msg: 'Name must be between 3 and 255 characters',
//       },
//     },
//   },
//   email: {
//     type: DataTypes.STRING,
//     defaultValue: '',
//     unique: {
//       msg: 'Email already in use',
//     },
//     validate: {
//       isEmail: {
//         msg: 'Invalid email address',
//       },
//     },
//   },
//   password_hash: {
//     type: DataTypes.STRING,
//     defaultValue: '',
//   },
//   password: {
//     type: DataTypes.VIRTUAL,
//     defaultValue: '',
//     validate: {
//       len: {
//         args: [6, 50],
//         msg: 'Password must be between 6 and 50 characters',
//       },
//     },
//   },
// }, {
//   sequelize,
// });

// User.addHook('beforeSave', async (user) => {
//   if (!user.password) return;
//   user.password_hash = await bcryptjs.hash(user.password, 8);
// });

// export default User;
