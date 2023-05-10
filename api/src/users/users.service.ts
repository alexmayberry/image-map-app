import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Media } from 'src/media/entities/media.entity';
import { Trip } from 'src/trips/entities/trip.entity/trip.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // private users: User[] = [
  //   {
  //     id: 1,
  //     username: 'alex',
  //     email: 'alex@email.com',
  //     password: 'password',
  //     inat: 'inatusername',
  //     trips: ['Nepal Study Abroad 2019', 'Nepal Study Abroad 2017'],
  //     media: ['photo1', 'photo2', 'audio1'],
  //   },
  // ];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.userRepository.find({
      relations: {
        trips: true,
        media: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    // first perform the db action
    const user = await this.userRepository.findOne({
      where: { id: +id },
      relations: {
        trips: true,
        media: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    // then return response
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    // const trips = await Promise.all(
    //   createUserDto.trips.map((name) => this.preloadTripByName(name)),
    // );

    // const media =
    //   createUserDto.media &&
    //   (await Promise.all(
    //     createUserDto.media.map((id) => this.preloadMediaById(id)),
    //   ));

    // first perform the db action
    const user = this.userRepository.create({
      ...createUserDto,
      // trips,
      // media,
    });
    // then return reponse
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // const trips =
    //   updateUserDto.trips &&
    //   (await Promise.all(
    //     updateUserDto.trips.map((id) => this.preloadTripByName(id)),
    //   ));

    // const media =
    //   updateUserDto.media &&
    //   (await Promise.all(
    //     updateUserDto.media.map((id) => this.preloadMediaById(id)),
    //   ));

    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
      // media,
      // trips,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  private async preloadTripByName(id: number): Promise<Trip> {
    const existingTrip = await this.tripRepository.findOne({
      where: { id },
    });
    if (existingTrip) {
      return existingTrip;
    }
    return this.tripRepository.create({ id });
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
}
