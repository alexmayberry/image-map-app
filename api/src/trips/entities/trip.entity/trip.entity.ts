import { type } from 'os';
import { Media } from 'src/media/entities/media.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  Feature,
  FeatureCollection,
  JoinTable,
  ManyToMany,
  ManyToOne,
  MultiLineString,
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

  @Column('geometry',{ nullable: true })
  route: MultiLineString;

  @OneToMany((type) => Media, (media) => media.trip, {
    cascade: true, // ['instert]
  })
  media: Media[];

  @Column('geometry', { nullable: true })
  days: Feature;
}
