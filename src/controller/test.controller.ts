import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import GameInfo from '../entities/GameInfo';
import GameOffers from '../entities/GameOffers';
import Store from '../entities/Store';

export const getCreateTestGames = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const newGameInfo = new GameInfo();
		newGameInfo.nameFiltered = 'Test Game';
		newGameInfo.nameRaw = 'Test Game';
		newGameInfo.slug = 'test-game';
		newGameInfo.type = 'Game';
		newGameInfo.drm = ['Steam'];
		newGameInfo.imageUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg?t=1600705762';
		newGameInfo.url = 'https://steamcommunity.com';

		const newStore = new Store();
		newStore.id = '99a4db67-7aa4-4e93-bf33-ee9817edcaba';
		newStore.name = 'Test Store';
		newStore.paymentMethods = ['PayPal', 'CreditCard'];

		const newGameOffer = new GameOffers();
		newGameOffer.rawName = 'Test Name';
		newGameOffer.store = newStore;
		newGameOffer.gameInfo = newGameInfo;
		newGameOffer.inStock = true;
		newGameOffer.url = 'https://steamcommunity.com';
		newGameOffer.tabId = 1;

		// await getRepository(GameInfo).save(newGameInfo);
		await getRepository(Store).save(newStore);
		// await getRepository(GameOffers).save(newGameOffer);

		return res.status(200).json({ success: true });
	} catch (err) {
		return next(err);
	}
};

export const getAuth = (req: Request, res: Response) => res.status(200).json({
	success: true,
});
