import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InscriptionsService } from './inscriptions.service';
import { InscriptionsController } from './inscriptions.controller';
import { InscriptionEntity } from './entities/inscriptions.entities';
import { StudentsModule } from 'src/students/students.module';
import { CoursesModule } from 'src/courses/courses.module';


@Module({
  controllers: [InscriptionsController],
  providers: [InscriptionsService],
  imports: [
    TypeOrmModule.forFeature([
        InscriptionEntity
    ]),
    StudentsModule,
    CoursesModule,
  ],
  exports: [
    InscriptionsService, 
    TypeOrmModule
  ],
})
export class InscriptionsModule {}