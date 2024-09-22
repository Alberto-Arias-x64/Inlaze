import { Column, Entity, JoinTable, PrimaryColumn } from "typeorm";

@Entity()
export class MovieEntity {
  @PrimaryColumn({ unique: true })
  public id: string;

  @Column({ default: 0 })
  @JoinTable()
  public favorites: number;
}
