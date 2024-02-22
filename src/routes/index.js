import { Router } from 'express';

import homeRoutes from './home';
import userRoutes from './user';
import tokenRoutes from './token';
import alunoRoutes from './aluno';
import fotoRoutes from './foto';

const router = new Router();

router.use(homeRoutes);
router.use(userRoutes);
router.use(tokenRoutes);
router.use(alunoRoutes);
router.use(fotoRoutes);

export default router;
