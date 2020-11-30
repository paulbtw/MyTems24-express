import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./Base";
import { GameInfo } from "./GameInfo";
import { User } from "./User";

@Entity()
@Index(["userId", "gameInfoId"], { unique: true })
export class Wishlist extends Base {
  // Relations
  @ManyToOne((type) => GameInfo)
  public gameInfo!: GameInfo;

  @Column({ nullable: false })
  public gameInfoId!: string;

  @ManyToOne((type) => User, (user) => user.wishlist)
  public user!: User;

  @Column({ nullable: false })
  public userId!: string;
}
