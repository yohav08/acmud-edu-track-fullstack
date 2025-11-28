import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentEntity } from './entities/students.entities';
import { UsersModule } from 'src/users/users.module';


@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
        StudentEntity
    ]),
    UsersModule,
  ],
  exports: [ 
    StudentsService,
    TypeOrmModule
  ],
})
export class StudentsModule {}