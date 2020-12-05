import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import gameRoutes from './game.routes';
import testRoutes from './test.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import redirectRoutes from './redirect.routes';
import searchRoutes from './search.routes';

dotenv.config();
const router = Router();

router.use('/game', gameRoutes);
router.use('/auth', authRoutes);
router.use('/test', testRoutes);
router.use('/user', userRoutes);
router.use('/redirect', redirectRoutes);
router.use('/search', searchRoutes);

router.use('/', (req: Request, res: Response) => {
	res.status(404).json({ success: false, message: 'Route not found' });
});

export default router;
