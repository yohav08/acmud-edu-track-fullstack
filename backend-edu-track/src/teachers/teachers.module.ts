import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TeacherEntity } from './entities/teachers.entities';


@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [
    ConfigModule, 
    TypeOrmModule.forFeature([TeacherEntity])
  ],
  exports: [
    TeachersService, 
    TypeOrmModule
  ],
})
export class UsersModule {}