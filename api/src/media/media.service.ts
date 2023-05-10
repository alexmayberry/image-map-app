import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Trip } from 'src/trips/entities/trip.entity/trip.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';
import { type } from 'os';
import * as gjv from 'geojson-validation';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.mediaRepository.find({
      relations: {
        user: true,
        trip: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const media = await this.mediaRepository.findOne({
      where: { id: +id },
      relations: {
        user: true,
        trip: true,
      },
    });
    if (!media) {
      throw new NotFoundException(`Media #${id} not found`);
    }
    // then return response
    return media;
  }

  async create(createMediaDto: CreateMediaDto) {
    const user = await this.preloadUserByName(createMediaDto.user);

    const trip = await this.preloadTripId(createMediaDto.trip);

    if (gjv.valid(createMediaDto.point)) {
      console.log("valid geojson!");
    } else {
      throw new BadRequestException(`invalid geojson`, { cause: new Error(), description: 'consult geojson docs to find correct syntax' });
    }

    const media = this.mediaRepository.create({
      ...createMediaDto,
      trip,
      user,
    });

    return this.mediaRepository.save(media);
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) {
    const media = await this.mediaRepository.findOne({
      where: { id: +id },
    });
    return this.mediaRepository.save(media);
  }

  async remove(id: number) {
    const media = await this.findOne(id);
    return this.mediaRepository.remove(media);
  }

  private async preloadTripId(id: number): Promise<Trip> {
    const existingTrip = await this.tripRepository.findOne({
      where: { id },
    });
    if (existingTrip) {
      return existingTrip;
    }
    throw new NotFoundException(`Trip #${id} not found for create media`);
  }

  private async preloadUserByName(username: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      return existingUser;
    }
    throw new NotFoundException(`User #${username} not found for create media`);
  }
}
