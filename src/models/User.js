import { Model, DataTypes } from "sequelize";
import bcryptjs from "bcryptjs";
import * as validations from "../validation";
import * as errors from "../validation/errors";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.nameEmpty;
              }
              if (!validations.isLengthValid(value, 2, 255)) {
                throw errors.models.nameLength;
              }
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: "",
          unique: { msg: "Email already in use." },
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.emailEmpty;
              }
              if (!validations.isEmailValid(value)) {
                throw errors.models.emailValidity;
              }
            },
          },
        },
        password_hash: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.VIRTUAL,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.passwordEmpty;
              }
              if (!validations.isLengthValid(value, 6, 60)) {
                throw errors.models.passwordLength;
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
