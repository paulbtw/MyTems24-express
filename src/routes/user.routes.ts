import { Router } from 'express';
import {
	deleteAlertItem,
	deleteWishlistItem,
	getAlert,
	getWishlist,
	putAlertItem,
	putWishlistItem,
} from '../controller/user.controller';
import isAuth from '../middlewares/isAuth.middleware';

const router = Router();

router.get('/wishlist', isAuth, getWishlist);

router.put('/wishlist/add/:id', isAuth, putWishlistItem);

router.delete('/wishlist/delete/:id', isAuth, deleteWishlistItem);

router.get('/alert', isAuth, getAlert);

router.put('/alert/add/:id', isAuth, putAlertItem);

router.delete('/alert/delete/:id', isAuth, deleteAlertItem);

export default router;
