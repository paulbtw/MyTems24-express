import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import GameInfo from '../entities/GameInfo';
import { ErrorObject } from '../helper/errorHandler';

export const getGameBySlug = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { slug } = req.params;

		const gameInfo = await getRepository(GameInfo)
			.createQueryBuilder('gameInfo')
			.where('gameInfo.slug = :slug AND gameInfo.isActive = :isTrue', {
				slug,
				isTrue: true,
			})
			.leftJoinAndSelect('gameInfo.gameOffers', 'gameOffer')
			.orderBy('gameOffer.price')
			.leftJoinAndSelect('gameOffer.store', 'store')
			.leftJoinAndSelect('gameInfo.fullGame', 'fullGame')
			.getOne();

		if (!gameInfo) {
			const error: ErrorObject = new Error('Game not found.');
			error.statusCode = 404;
			throw error;
		}

		return res.status(200).json({ gameInfo });
	} catch (err) {
		return next(err);
	}
};

export const getGameById = (req: Request, res: Response) => res.status(200).json({ success: true });
