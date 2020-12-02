/* eslint-disable import/no-cycle */
import {
	Column, Entity, Index, ManyToOne,
} from 'typeorm';
import Base from './Base';
import GameInfo from './GameInfo';
import User from './User';

@Entity()
@Index(['userId', 'gameInfoId'], { unique: true })
class Alert extends Base {
	// Relations
	@ManyToOne(() => GameInfo)
	public gameInfo!: GameInfo;

	@Column({ nullable: false })
	public gameInfoId!: string;

	@ManyToOne(() => User, (user) => user.alert)
	public user!: User;

	@Column('decimal', { precision: 8, scale: 2, nullable: false })
	public price!: number;

	@Column({ nullable: false })
	public userId!: string;
}

export default Alert;
