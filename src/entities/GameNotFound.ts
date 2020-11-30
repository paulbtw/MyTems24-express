import { Entity, Column, OneToMany, ManyToOne, Index } from "typeorm";
import { Base } from "./Base";
import { Store } from "./Store";

@Entity()
export class GameNotFound extends Base {
  @Column("varchar", { length: 512 })
  public name!: string;

  @Column("text", { unique: true })
  public url!: string;

  // Relations
  @Column({ nullable: false })
  public storeId!: string;

  @ManyToOne((type) => Store, (store) => store.gamesNotFound)
  public store!: Store;
}
