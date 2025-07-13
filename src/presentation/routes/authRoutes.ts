import { Router } from 'express';
import { AuthController } from '@/presentation/controllers/authController';

const router = Router();
const authController = new AuthController();

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

export { router as authRoutes };
