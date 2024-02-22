import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import fotoController from '../controllers/foto';

const router = new Router();

router.post('/fotos', loginRequired, fotoController.store);

export default router;
