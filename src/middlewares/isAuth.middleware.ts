import { Request, Response, NextFunction } from 'express';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
	if (!req.user) {
		res.status(401).json({
			authenticated: false,
			message: 'user has not been authenticated',
		});
	} else {
		next();
	}
};

export default isAuth;
