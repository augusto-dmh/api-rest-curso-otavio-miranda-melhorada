import { Model, DataTypes } from "sequelize";
import appConfig from "../config/appConfig";
import * as validations from "../validation/validations";
import * as errors from "../validation/errors";

export default class Foto extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            empty(value) {
              if (!validations.isNotEmpty(value)) {
                throw new Error(errors.originalnameEmpty);
              }
            },
          },
        },
        filename: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            empty(value) {
              if (!validations.isNotEmpty(value)) {
                throw new Error(errors.filenameEmpty);
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
