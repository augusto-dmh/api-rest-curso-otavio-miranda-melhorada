import { ValidationError } from "sequelize";
import * as errors from "../validation/errors";
import Aluno from "../models/Aluno";
import Foto from "../models/Foto";

const index = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [
        ["id", "DESC"],
        [Foto, "id", "DESC"],
      ],
      include: {
        model: Foto,
        attributes: ["url", "filename"],
      },
    });

    res.json(alunos);
  } catch (err) {
    res.status(500).json({
      error: errors.controllers.internalServerError,
    });
  }
};

const store = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);

    res.json(aluno);
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

const show = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: errors.controllers.missingId,
      });
    }

    const aluno = await Aluno.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [
        ["id", "DESC"],
        [Foto, "id", "DESC"],
      ],
      include: {
        model: Foto,
        attributes: ["url", "filename"],
      },
    });

    if (!aluno) {
      return res.status(404).json({
        errors: errors.controllers.alunoNotFound,
      });
    }

    res.json(aluno);
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
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: errors.controllers.missingId,
      });
    }

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({
        errors: errors.controllers.alunoNotFound,
      });
    }

    await aluno.destroy();
    res.json("Aluno successfully deleted");
  } catch (e) {
    res.status(500).json({
      error: errors.controllers.internalServerError,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: errors.controllers.missingId,
      });
    }

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({
        errors: errors.controllers.alunoNotFound,
      });
    }

    const newAluno = await aluno.update(req.body);

    res.json(newAluno);
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

export default { index, store, show, destroy, update };
