/* eslint-disable import/prefer-default-export */
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import GameInfo from '../entities/GameInfo';

const PAGE_LIMIT = 24;

export const getSearch = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const query = req.query.q || '';
		const page = req.query.page || 1;

		const pageNumber = Number.isNaN(Number(page)) ? 1 : Number(page);

		const searchResult = await getRepository(GameInfo)
			.createQueryBuilder('g')
			.where('g.nameRaw ILIKE :query', { query: `%${query}%` })
			.limit(PAGE_LIMIT)
			.offset(PAGE_LIMIT * (pageNumber - 1))
			.getMany();

		return res.status(200).json({ success: true, result: searchResult });
	} catch (err) {
		return next(err);
	}
};
