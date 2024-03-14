import { Model, DataTypes } from "sequelize";
import appConfig from "../config/appConfig";
import * as validations from "../validation";
import * as errors from "../validation/errors";

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.originalname.empty;
              }
            },
          },
        },
        filename: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            custom(value) {
              if (!validations.isNotEmpty(value)) {
                throw errors.models.filename.empty;
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
        modelName: "photo",
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.student, { foreignKey: "studentId" });
  }
}
