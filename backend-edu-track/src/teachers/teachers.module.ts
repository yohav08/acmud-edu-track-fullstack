import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TeacherEntity } from './entities/teachers.entities';
import { UsersModule } from 'src/users/users.module';


@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [
    TypeOrmModule.forFeature([
      TeacherEntity
    ]),
    UsersModule,
  ],
  exports: [
    TeachersService,
    TypeOrmModule
  ],
})
export class TeachersModule {}