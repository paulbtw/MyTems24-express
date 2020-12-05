import { Router } from 'express';
import { getRedirectByOfferId } from '../controller/redirect.controller';

const router = Router();

router.get('/:offerId', getRedirectByOfferId);

export default router;
