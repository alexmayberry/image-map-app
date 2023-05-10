import { PartialType } from '@nestjs/mapped-types';
import { IsArray } from 'class-validator';
import { CreateTripDto } from './create-trip.dto';

export class UpdateTripDto extends PartialType(CreateTripDto) {
  @IsArray()
  readonly media?: number[]; // one to many
}
