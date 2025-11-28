import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/users.entities';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule,
    // Importr la entidad UserEntity
    TypeOrmModule.forFeature([
      UserEntity
    ]),

    // JWT Config
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY') || 'defaultSecretKey',
          signOptions: {
            expiresIn: '24h'
          }
        }
      }
    })
  ],
  exports: [
    AuthService,
    TypeOrmModule
  ]
})
export class AuthModule {}