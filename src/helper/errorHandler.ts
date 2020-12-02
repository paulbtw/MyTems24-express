import { Request, Response } from 'express';

export interface ErrorObject extends Error {
	statusCode?: number;
	data?: any;
}

export const errorHandler = (err: ErrorObject, req: Request, res: Response) => {
	if (typeof err === 'string') {
		return res.status(400).json({ message: err, success: false });
	}
	const errStatusCode = err.statusCode as number | 500;
	return res
		.status(errStatusCode)
		.json({ message: err.message, success: false });
};
