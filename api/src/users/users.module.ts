import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'src/media/entities/media.entity';
import { Trip } from 'src/trips/entities/trip.entity/trip.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Trip, Media])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
