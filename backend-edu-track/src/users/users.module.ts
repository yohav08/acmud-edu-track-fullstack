import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/users.entities';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ConfigModule, 
    TypeOrmModule.forFeature([UserEntity])
  ],
  exports: [
    UsersService, 
    TypeOrmModule
  ],
})
export class UsersModule {}