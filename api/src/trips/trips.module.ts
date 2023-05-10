import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'src/media/entities/media.entity';
import { User } from 'src/users/entities/user.entity';
import { Trip } from './entities/trip.entity/trip.entity';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, User, Media])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
