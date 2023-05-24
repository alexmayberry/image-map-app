import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Feature, FeatureCollection, MultiLineString } from 'typeorm';

export class CreateTripDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly year: number;

  @IsString()
  readonly slug: string;

  @IsString({ each: true })
  readonly users: string[]; // many to many

  @IsObject()
  readonly route: MultiLineString;

  // @IsNumber()
  // @IsArray()
  // readonly media: number[]; // one to many

  @IsNotEmpty()
  readonly days: Feature;
}
