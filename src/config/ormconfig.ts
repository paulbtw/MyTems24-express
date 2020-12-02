import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const startDir = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

const config: ConnectionOptions = {
	type: 'postgres',
	url: process.env.DB_URL,
	synchronize: true,
	entities: [
		`${startDir}/entities/GameInfo{.ts,.js}`,
		`${startDir}/entities/GameNotFound{.ts,.js}`,
		`${startDir}/entities/GameOffers{.ts,.js}`,
		`${startDir}/entities/Store{.ts,.js}`,
		`${startDir}/entities/User{.ts,.js}`,
		`${startDir}/entities/Wishlist{.ts,.js}`,
		`${startDir}/entities/Alert{.ts,.js}`,
	],
};

export default config;
