/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import UserEntity from '../entities/User';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (!req.user?.isAdmin) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized',
		});
	}
	return next();
};

export default isAdmin;

// Move to seperate types folder
declare global {
	namespace Express {
		interface User extends UserEntity {}
	}
}
