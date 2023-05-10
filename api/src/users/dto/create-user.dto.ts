import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly inat: string; // or hopefully something more permentant like a user id

  // @IsString({ each: true })
  // readonly trips: string[];

  // @IsNumber()
  // readonly media: number[];
}
