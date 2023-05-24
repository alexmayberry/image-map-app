import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { take } from 'rxjs';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Media } from 'src/media/entities/media.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity/trip.entity';
import { CreateMediaDto } from 'src/media/dto/create-media.dto';
import * as gjv from 'geojson-validation';

@Injectable()
export class TripsService {
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
    return this.tripRepository.find({
      relations: {
        users: true,
        media: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const trip = await this.tripRepository.findOne({
      where: { id: +id },
      relations: {
        users: true,
        media: true,
      },
    });
    if (!trip) {
      throw new NotFoundException(`Trip #${id} not found`);
    }
    // then return response
    return trip;
  }

  async create(createTripDto: CreateTripDto) {
    const users = await Promise.all(
      createTripDto.users.map((name) => this.preloadUserByName(name)),
    );

    if (gjv.valid(createTripDto.route) && gjv.valid(createTripDto.days)) {
      console.log("valid geojson!");
    } else {
      throw new BadRequestException(`invalid geojson`, { cause: new Error(), description: 'consult geojson docs to find correct syntax' });
    }

    // first perform the db action
    const trip = this.tripRepository.create({
      ...createTripDto,
      users,
    });
    // then return reponse
    return this.tripRepository.save(trip);
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const users =
      updateTripDto.users &&
      (await Promise.all(
        updateTripDto.users.map((username) => this.preloadUserByName(username)),
      ));

    const media = await Promise.all(
      updateTripDto.media.map((id) => this.preloadMediaById(id)),
    );

    const trip = await this.tripRepository.preload({
      id: +id,
      ...updateTripDto,
      users,
      media,
    });
    if (!trip) {
      throw new NotFoundException(`Trip #${id} not found`);
    }
    return this.tripRepository.save(trip);
  }

  async remove(id: string) {
    const trip = await this.findOne(id);
    return this.tripRepository.remove(trip);
  }

  private async preloadUserByName(username: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      return existingUser;
    }
    console.log('user NOT found for create trip');
    return this.userRepository.create({ username });
  }

  private async preloadMediaById(id: number): Promise<Media> {
    const existingMedia = await this.mediaRepository.findOne({
      where: { id },
    });
    if (existingMedia) {
      return existingMedia;
    }
    return this.mediaRepository.create({ id });
  }

  private async preloadTripById(id: number): Promise<Trip> {
    const existingTrip = await this.tripRepository.findOne({
      where: { id },
    });
    if (existingTrip) {
      return existingTrip;
    }
    throw new NotFoundException(`Trip #${id} not found`);
  }
}
