import { Request, Response, NextFunction } from 'express';

export const getAuthSteamFailed = (
	req: Request,
	res: Response,
) => {
	res.status(401).json({
		success: false,
		message: 'Failed to authenticate.',
	});
};

export const getAuthLoginSuccess = (
	req: Request,
	res: Response,
) => res.status(200).json({
	success: true,
	// user: req.user,
	// cookies: req.cookies,
});

export const getLogout = (req: Request, res: Response) => {
	req.logout();
	const redirect = req.query.r || '/';
	res.redirect((process.env.CLIENT_URL as string) + redirect);
};

export const setRedirect = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.query.r && req.session) {
		req.session.returnTo = req.query.r;
	}
	next();
};
