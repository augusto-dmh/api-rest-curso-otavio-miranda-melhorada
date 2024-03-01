import { Model, DataTypes } from "sequelize";
import appConfig from "../config/appConfig";
import * as validations from "../validation";
import * as errors from "../validation/errors";

export default class Foto extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: DataTypes.STRING,
          validate: {
            custom(value) {
              if (!validations.isNotNull(value)) {
                throw errors.models.originalnameNull;
              }
              if (!validations.isNotEmpty(value)) {
                throw errors.models.originalnameEmpty;
              }
            },
          },
        },
        filename: {
          type: DataTypes.STRING,
          validate: {
            custom(value) {
              if (!validations.isNotNull(value)) {
                throw errors.models.filenameNull;
              }
              if (!validations.isNotEmpty(value)) {
                throw errors.models.filenameEmpty;
              }
            },
          },
        },
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue("filename")}`;
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
    this.belongsTo(models.Aluno, { foreignKey: "aluno_id" });
  }
}
