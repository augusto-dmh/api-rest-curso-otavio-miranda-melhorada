import { ValidationError } from "sequelize";
import User from "../models/User";
import * as errors from "../validation/errors";

const store = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const { id, nome, email } = newUser;
    res.json({ id, nome, email });
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
    const users = await User.findAll({ attributes: ["id", "nome", "email"] });
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

    const { nome, email } = user;
    res.json({ id, nome, email });
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

    if (req.body.password_hash) {
      return res.status(404).json({
        errors: errors.controllers.passwordHashUpdate,
      });
    }

    const updatedData = await user.update(req.body);
    const { nome, email } = updatedData;

    res.json({ id, nome, email });
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
