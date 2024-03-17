import User from "../models/User";
import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
import ErrorContext from "../validation/errors/classes/ErrorContext";

const store = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const { id, name, email } = newUser;
    res.json({ id, name, email });
  } catch (err) {
    err instanceof ErrorContext
      ? next(err)
      : next(
          new ErrorContext(err, {
            function: "User.create",
            file: "src/controllers/user.js",
            path: "/users",
            line: 7,
          }),
        );
  }
};

const index = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    res.json(users);
  } catch (err) {
    err instanceof ErrorContext
      ? next(err)
      : next(
          new ErrorContext(err, {
            function: "User.findAll",
            file: "src/controllers/user.js",
            path: "/users",
            line: 21,
          }),
        );
  }
};

const show = async (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new ErrorContext(new ApiError(...errors.controllers.createUserNotFound(id, fullPath)), {
        function: "User.findByPk",
        file: "src/controllers/user.js",
        path: `/users/${id}`,
        line: 45,
      });
    }

    const { name, email } = user;
    res.json({ id, name, email });
  } catch (err) {
    err instanceof ErrorContext
      ? next(err)
      : next(
          new ErrorContext(err, {
            function: "User.findByPk",
            file: "src/controllers/user.js",
            path: `/users/${id}`,
            line: 40,
          }),
        );
  }
};

const update = async (req, res, next) => {
  const id = req.userId;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      next(
        new ErrorContext(new ApiError(...errors.controllers.createUserNotFound(id)), {
          function: "userController.update",
          file: "src/controllers/user.js",
          path: `/users/${id}`,
          line: 61,
        }),
      );
      return;
    }

    const updatedData = await user.update(req.body);
    const { name, email } = updatedData;

    res.json({ id, name, email });
  } catch (err) {
    err instanceof ErrorContext
      ? next(err)
      : next(
          new ErrorContext(err, {
            function: "userController.update",
            file: "src/controllers/user.js",
            path: `/users/${id}`,
          }),
        );
  }
};

const destroy = async (req, res, next) => {
  const id = req.userId;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      next({
        err: new ApiError(...errors.controllers.createUserNotFound(id)),
        source: {
          function: "userController.destroy",
          file: "src/controllers/user.js",
          path: `/users/${id}`,
          line: 87,
        },
      });
      return;
    }

    await user.destroy();
    res.json(null);
  } catch (err) {
    err instanceof ErrorContext
      ? next(err)
      : next(
          new ErrorContext(err, {
            function: "userController.destroy",
            file: "src/controllers/user.js",
            path: `/users/${id}`,
          }),
        );
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
