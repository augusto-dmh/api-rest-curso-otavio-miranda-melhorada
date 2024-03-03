import { Model, DataTypes } from "sequelize";
import { hashSync } from "bcryptjs";
import * as validations from "../validation";
import * as errors from "../validation/errors";

export default class User extends Model {
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
              if (!validations.isLengthValid(value, 2, 255)) {
                throw errors.models.name.invalidLength.message;
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
        password: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.password.empty.message;
              }
              if (!validations.isLengthValid(value, 6, 60)) {
                throw errors.models.password.invalidLength.message;
              }
            },
          },
        },
      },
      {
        sequelize,
        modelName: "user",
      },
    );

    this.addHook("afterValidate", (user) => {
      user.password = hashSync(user.password, 10);
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
