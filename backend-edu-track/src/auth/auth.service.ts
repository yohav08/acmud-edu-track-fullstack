import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from 'src/users/entities/users.entities';

@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,

        private readonly configService: ConfigService,

        private readonly jwtService: JwtService
    ){}

    /**
     * ! REGISTRAR USUARIO
     */
    async registerUser(registerUserDto: RegisterUserDto){
        
        const {password, ...userData} = registerUserDto;

        try {
            
            const user = this.usersRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, Number(this.configService.get('SALT_ROUNDS_DEV'))) // Bloquear el hilo principal de ejecucion
            })

            await this.usersRepository.save(user);
            return {
                user: {
                    ...userData
                },
                Message: "Usuario creado exitosamente!!"
            };
        } catch (error) {
            this.handlerErrors(error);
        }
    }

    /**
     * ! LOGIN
     */
    async loginUser(loginUserDto: LoginUserDto){
        const {email, password} = loginUserDto;

        const user = await this.usersRepository.findOne({
            select: {
                id: true,
                password: true,
                name: true,
                email: true,
                rol: true,
                createdAt: true
            },
            where: {email}
        })

        if(!user) throw new NotFoundException(`Usuario con email: ${email} no encontrado`)
        
        const passOrNotPass = bcrypt.compareSync(password, user.password);
        
        if(!passOrNotPass) throw new UnauthorizedException(`Contraseña no válida`);
        

        return {
            Details: {
                Message: "Inicio de sesión exitoso!!",
                UserDetails: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    rol: user.rol
                }
            },
            token: this.jwtService.sign({
                userId: user.id,
                email: user.email, 
                rol: user.rol
            })
        };
    }

    /**
     * ! Validar JWT
     */
    async validateToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            return payload;
        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }
    }

    /**
     * ! Manejo de errores - Error Handler
     */
    private handlerErrors(error: any){
        if(error.code === '23505'){
          throw new BadRequestException('El email ya está registrado');
        }
        this.logger.error(error)
        throw new BadRequestException(error.message)
    }
}