import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

const index = async (req, res) => {
  const alunos = await Aluno.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
    include: {
      model: Foto,
      attributes: ['url', 'filename'],
    },
  });
  res.json(alunos);
};

const store = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);

    res.json(aluno);
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: ["Missing 'id' parameter"],
      });
    }

    const aluno = await Aluno.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename'],
      },
    });

    if (!aluno) {
      return res.status(404).json({
        errors: ['Aluno not found'],
      });
    }

    res.json(aluno);
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: ["Missing 'id' parameter"],
      });
    }

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({
        errors: ['Aluno not found'],
      });
    }

    await aluno.destroy();
    res.json('Aluno successfully deleted');
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: ["Missing 'id' parameter"],
      });
    }

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({
        errors: ['Aluno not found'],
      });
    }

    const newAluno = await aluno.update(req.body);

    res.json(newAluno);
  } catch (e) {
    res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export default { index, store, show, destroy, update };
