/* eslint-disable import/no-cycle */
import {
	Column, Entity, Index, OneToMany,
} from 'typeorm';
import Alert from './Alert';
import Base from './Base';
import Wishlist from './Wishlist';

@Entity()
class User extends Base {
	@Column('varchar', { length: 200, unique: true, nullable: true })
	@Index({ unique: true })
	public email!: string;

	@Column('varchar', { nullable: true })
	public password!: string;

	@Column('boolean', { default: true, nullable: false })
	public isActive!: boolean;

	@Column('boolean', { default: false, nullable: false })
	public emailNotifications!: boolean;

	@Column('varchar', { unique: true, nullable: true })
	@Index({ unique: true })
	public steamId!: string;

	@OneToMany(() => Wishlist, (wishlist) => wishlist.user)
	public wishlist!: Wishlist[];

	@OneToMany(() => Alert, (alert) => alert.user)
	public alert!: Alert[];
}

export default User;
