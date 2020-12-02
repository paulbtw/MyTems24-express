import { Router } from 'express';
import { getAuth, getCreateTestGames } from '../controller/test.controller';
import isAuth from '../middlewares/isAuth.middleware';

const router = Router();

router.get('/create', getCreateTestGames);

router.get('/auth', isAuth, getAuth);

export default router;
