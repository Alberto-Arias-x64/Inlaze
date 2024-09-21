import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ default: "CURRENT_TIMESTAMP" })
  public createdAt?: Date;

  @Column({ default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  public updatedAt?: Date;
}
