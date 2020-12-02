/* eslint-disable import/no-cycle */
import { Entity, Column, ManyToOne } from 'typeorm';
import Base from './Base';
import Store from './Store';

@Entity()
class GameNotFound extends Base {
	@Column('varchar', { length: 512 })
	public name!: string;

	@Column('text', { unique: true })
	public url!: string;

	// Relations
	@Column({ nullable: false })
	public storeId!: string;

	@ManyToOne(() => Store, (store) => store.gamesNotFound)
	public store!: Store;
}

export default GameNotFound;
