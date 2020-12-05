import { Router } from 'express';
import { getSearch } from '../controller/search.controller';

const router = Router();

router.get('/', getSearch);

export default router;
