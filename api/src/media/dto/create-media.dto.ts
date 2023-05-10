import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Point } from 'typeorm';

export class CreateMediaDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly trip: number;

  @IsNumber()
  readonly day: number;

  @IsOptional()
  readonly point?: Point;

  @IsString()
  readonly type: string; // blog image, video, audio

  @IsString()
  readonly resource: string;

  @IsString()
  readonly user: string;
}
