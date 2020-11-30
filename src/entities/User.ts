import { Column, Entity, Index, OneToMany } from "typeorm";
import { Alert } from "./Alert";
import { Base } from "./Base";
import { Wishlist } from "./Wishlist";

@Entity()
export class User extends Base {
  @Column("varchar", { length: 200, unique: true, nullable: true })
  @Index({ unique: true })
  public email!: string;

  @Column("varchar", { nullable: true })
  public password!: string;

  @Column("boolean", { default: true, nullable: false })
  public isActive!: boolean;

  @Column("boolean", { default: false, nullable: false })
  public emailNotifications!: boolean;

  @Column("varchar", { unique: true, nullable: true })
  @Index({ unique: true })
  public steamId!: string;

  @OneToMany((type) => Wishlist, (wishlist) => wishlist.user)
  public wishlist!: Wishlist[];

  @OneToMany((type) => Alert, (alert) => alert.user)
  public alert!: Alert[];
}
