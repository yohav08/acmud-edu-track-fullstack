import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseEntity } from './entities/courses.entities';
import { TeachersModule } from 'src/teachers/teachers.module';


@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [
    TypeOrmModule.forFeature([
        CourseEntity
    ]),
    TeachersModule, // Para usar TeachersService
  ],
  exports: [
    CoursesService, 
    TypeOrmModule
  ],
})
export class CoursesModule {}