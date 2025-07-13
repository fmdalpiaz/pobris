import { Router } from 'express';
import { AccountController } from '@/presentation/controllers/accountController';
import { authenticateToken } from '@/application/middleware/auth';

const router = Router();
const accountController = new AccountController();

router.use(authenticateToken);

router.post('/', (req, res) => accountController.create(req, res));
router.get('/', (req, res) => accountController.getAll(req, res));
router.get('/:id', (req, res) => accountController.getById(req, res));
router.put('/:id', (req, res) => accountController.update(req, res));
router.delete('/:id', (req, res) => accountController.delete(req, res));

export { router as accountRoutes };
