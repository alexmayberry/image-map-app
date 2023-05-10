import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from 'src/trips/entities/trip.entity/trip.entity';
import { User } from 'src/users/entities/user.entity';
import { Media } from './entities/media.entity';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Trip, Media])],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
