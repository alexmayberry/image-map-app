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
  @IsNumber({}, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(3)
  readonly point?: number[];

  @IsString()
  readonly type: string; // blog image, video, audio

  @IsString()
  readonly resource: string;

  @IsString()
  readonly user: string;
}
