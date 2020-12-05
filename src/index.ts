import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import session from 'cookie-session';
import router from './routes';
import { errorHandler } from './helper/errorHandler';
import config from './config/ormconfig';

dotenv.config();
createConnection(config).then(() => {
	const app = express();

	app.use(cookieParser());
	app.use(
		session({
			secret: 'rasdasdasdasd.as',
			name: 'session',
			maxAge: 24 * 60 * 60 * 1000,
		}),
	);

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(
		cors({
			origin: 'http://localhost:3000', // allow to server to accept request from different origin
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			credentials: true, // allow session cookie from browser to pass through
		}),
	);

	app.use(passport.initialize());
	app.use(passport.session());
	// eslint-disable-next-line global-require
	require('./config/passport');

	app.use('/', router);

	app.use(errorHandler);

	const port = process.env.NODE_ENV === 'production' ? 80 : 5000;
	app.listen(port);
});
