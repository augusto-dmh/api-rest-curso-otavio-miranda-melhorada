import { ValidationError } from "sequelize";
import User from "../models/User";
import * as errors from "../validation/errors";

const store = async (req, res) => {
  if (req.body.passwordHash) {
    return res.status(404).json({
      errors: errors.controllers.passwordHashAssigning,
    });
  }

  try {
    const newUser = await User.create(req.body);
    const { id, name, email } = newUser;
    res.json({ id, name, email });
  } catch (e) {
    if (e instanceof ValidationError) {
      const apiError = errors.controllers.validationError;
      apiError.subErrors = e.errors.map((error) => error.message);

      res.status(400).json({
        error: apiError,
      });
      return;
    }

    res.status(500).json({
      error: errors.controllers.internalServerError,
    });
  }
};

const index = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    res.json(users);
  } catch (e) {
    res.status(500).json({
      error: errors.controllers.internalServerError,
    });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    const { name, email } = user;
    res.json({ id, name, email });
  } catch (e) {
    res.status(500).json({
      error: errors.controllers.internalServerError,
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        errors: errors.controllers.userNotFound,
      });
    }

    if (req.body.passwordHash) {
      return res.status(404).json({
        errors: errors.controllers.passwordHashAssigning,
      });
    }

    const updatedData = await user.update(req.body);
    const { name, email } = updatedData;

    res.json({ id, name, email });
  } catch (e) {
    if (e instanceof ValidationError) {
      const apiError = errors.controllers.validationError;
      apiError.subErrors = e.errors.map((error) => error.message);

      res.status(400).json({
        error: apiError,
      });
      return;
    }

    res.status(500).json({
      error: errors.controllers.internalServerError,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        errors: errors.controllers.userNotFound,
      });
    }

    await user.destroy();
    res.json(null);
  } catch (e) {
    res.status(500).json({
      error: errors.controllers.internalServerError,
    });
  }
};

export default { store, index, show, update, destroy };

/*
index -> lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH ou PUT
*/
