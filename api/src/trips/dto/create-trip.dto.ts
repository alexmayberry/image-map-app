import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly year: number;

  @IsString()
  readonly slug: string;

  @IsString({ each: true })
  readonly users: string[]; // many to many

  @IsString()
  readonly route: string;

  // @IsNumber()
  // @IsArray()
  // readonly media: number[]; // one to many

  @IsString()
  readonly days: string; // one to many
}
