import multer from 'multer';
import multerConfig from '../config/multer';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('photo');

const store = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        errors: [err.code],
      });
    }

    const { originalname, filename } = req.file;
    const { aluno_id } = req.body;

    try {
      const foto = await Foto.create({ originalname, filename, aluno_id });

      res.json(foto);
    } catch (e) {
      res.status(400).json({
        errors: ['Invalid aluno_id'],
      });
    }
  });
};

export default { store };
