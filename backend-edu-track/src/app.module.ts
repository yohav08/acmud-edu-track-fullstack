import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { SeedModule } from './seed/seed.module';

import { UsersModule } from './users/users.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { InscriptionsModule } from './inscription/inscriptions.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT!,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        autoLoadEntities: true,
        synchronize: true
      }
    ),
    UsersModule,
    TeachersModule,
    StudentsModule,
    InscriptionsModule,
    CoursesModule,
    AuthModule
    // SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

