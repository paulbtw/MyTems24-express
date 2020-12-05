/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import GameOffers from '../entities/GameOffers';
import { ErrorObject } from '../helper/errorHandler';

export const getRedirectByOfferId = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { offerId } = req.params;
		const gameOffer = await getRepository(GameOffers).findOne({
			where: { id: offerId },
		});

		if (!gameOffer) {
			const error: ErrorObject = new Error('Offer not found.');
			error.statusCode = 404;
			throw error;
		}

		return res.status(200).json({ success: true, url: gameOffer.url });
	} catch (err) {
		return next(err);
	}
};
