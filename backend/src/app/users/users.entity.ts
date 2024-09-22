import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MovieEntity } from "../movies/movies.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ default: true })
  public isActive?: boolean;

  @CreateDateColumn()
  public createdAt?: Date;

  @CreateDateColumn()
  public updatedAt?: Date;

  @ManyToMany(() => MovieEntity)
  @JoinTable()
  public movies: MovieEntity[];
}
