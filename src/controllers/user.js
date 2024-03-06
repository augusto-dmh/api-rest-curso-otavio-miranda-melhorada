import User from "../models/User";
import * as errors from "../validation/errors";

const store = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const { id, name, email } = newUser;
    res.json({ id, name, email });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    const { name, email } = user;
    res.json({ id, name, email });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findByPk(id);

    if (!user) {
      next(errors.controllers.userNotFound);
      return;
    }

    const updatedData = await user.update(req.body);
    const { name, email } = updatedData;

    res.json({ id, name, email });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findByPk(id);

    if (!user) {
      next(errors.controllers.userNotFound);
      return;
    }

    await user.destroy();
    res.json(null);
  } catch (err) {
    next(err);
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
