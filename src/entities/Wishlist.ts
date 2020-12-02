/* eslint-disable import/no-cycle */
import {
	Column, Entity, Index, ManyToOne,
} from 'typeorm';
import Base from './Base';
import GameInfo from './GameInfo';
import User from './User';

@Entity()
@Index(['userId', 'gameInfoId'], { unique: true })
class Wishlist extends Base {
	// Relations
	@ManyToOne(() => GameInfo)
	public gameInfo!: GameInfo;

	@Column({ nullable: false })
	public gameInfoId!: string;

	@ManyToOne(() => User, (user) => user.wishlist)
	public user!: User;

	@Column({ nullable: false })
	public userId!: string;
}

export default Wishlist;
