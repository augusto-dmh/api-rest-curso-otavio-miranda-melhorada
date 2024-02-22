import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';
import alunoController from '../controllers/aluno';

const router = new Router();

router.post('/alunos', loginRequired, alunoController.store);
router.get('/alunos', alunoController.index);
router.get('/alunos/:id', alunoController.show);
router.put('/alunos/:id', loginRequired, alunoController.update);
router.delete('/alunos/:id', loginRequired, alunoController.destroy);

export default router;
