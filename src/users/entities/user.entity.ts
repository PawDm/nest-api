import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
class User{
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column({nullable: true})
  public isAdmin: boolean


}

export default User;
