import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripsModule } from './trips/trips.module';
import { UsersModule } from './users/users.module';
import { MediaModule } from './media/media.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.PGIS_USERNAME,
      password: process.env.PGIS_PASSWORD,
      database: process.env.PGIS_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TripsModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
