import { Trip } from 'src/trips/entities/trip.entity/trip.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToOne((type) => User, (user) => user.media)
  user: User;

  @ManyToOne((type) => Trip, (trip) => trip.media)
  trip: Trip;

  @Column()
  day: number;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326 })
  point: Point;

  @Column({ nullable: true })
  type: string; // blog image, video, audio

  @Column()
  resource: string;
}
