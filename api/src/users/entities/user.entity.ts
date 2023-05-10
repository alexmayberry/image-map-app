import { type } from 'os';
import { Media } from 'src/media/entities/media.entity';
import { Trip } from 'src/trips/entities/trip.entity/trip.entity';
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
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  inat: string; // or hopefully something more permentant like a user id

  @JoinTable()
  @ManyToMany((type) => Trip, (trip) => trip.users, {
    cascade: true, // ['instert]
  })
  trips: Trip[];

  @OneToMany((type) => Media, (media) => media.user, {
    cascade: true, // ['instert]
  })
  media: Media[];
}
