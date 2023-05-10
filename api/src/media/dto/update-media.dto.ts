import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateMediaDto } from './create-media.dto';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {}
