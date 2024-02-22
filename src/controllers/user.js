import User from "../models/User";

const store = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const { id, nome, email } = newUser;
    res.json({ id, nome, email });
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const index = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "nome", "email"] });
    res.json(users);
  } catch (e) {
    res.json(null);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    const { nome, email } = user;
    res.json({ id, nome, email });
  } catch (e) {
    res.json(null);
  }
};

const update = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        errors: ["User not found"],
      });
    }

    if (req.body.password_hash) {
      return res.status(404).json({
        errors: ["The field 'password_hash' can't be updated"],
      });
    }

    const updatedData = await user.update(req.body);
    const { nome, email } = updatedData;

    res.json({ id, nome, email });
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        errors: ["User not found"],
      });
    }

    await user.destroy();
    res.json(null);
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((err) => err.message),
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
