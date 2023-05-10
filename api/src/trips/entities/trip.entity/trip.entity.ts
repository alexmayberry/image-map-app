import { type } from 'os';
import { Media } from 'src/media/entities/media.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  slug: string;

  @ManyToMany((type) => User, (user) => user.trips)
  users: User[]; // many to many

  @Column({ nullable: true })
  route: string;

  @OneToMany((type) => Media, (media) => media.trip, {
    cascade: true, // ['instert]
  })
  media: Media[];

  @Column({ nullable: true })
  days: string; // one to many
}
