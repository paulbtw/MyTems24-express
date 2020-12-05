/* eslint-disable no-underscore-dangle */
import passport from 'passport';
import { getRepository } from 'typeorm';
import User from '../entities/User';

const SteamStrategy = require('passport-steam').Strategy;

passport.use(
	new SteamStrategy(
		{
			returnURL: 'http://localhost:5000/auth/steam/callback',
			realm: 'http://localhost:5000/',
			apiKey: process.env.STEAM_API_KEY,
		},
		async (identifier: string, profile: any, done: any) => {
			const currentUser = await getRepository(User).findOne({
				where: { steamId: profile._json.steamid },
			});
			if (!currentUser) {
				const newUser = new User();
				newUser.steamId = profile._json.steamid;
				if (profile._json.steamid === '76561198052869177') {
					newUser.isAdmin = true;
				}
				const savedUser = await getRepository(User).save(newUser);

				if (savedUser) {
					return done(null, newUser);
				}
			}
			return done(null, currentUser);
		},
	),
);

passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
	getRepository(User)
		.findOne({ where: { id } })
		.then((user) => {
			done(null, user);
		})
		.catch(() => {
			done(new Error('Failed to deserialize user'));
		});
});
