import {  BadRequestException,  Injectable,  Logger,  NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/users.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  /**
   * ! Método para crear usuario 
   */
  async createUser(createUserDto: CreateUserDto) {
    try {
      // Verificar si el email ya existe
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email }
      });
      
      if (existingUser) {
        throw new BadRequestException(`El email ${createUserDto.email} ya está registrado`);
      }

      const user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
      
      // Retornamos el usuario sin el pswd por seguridad
      const { password, ...userWithoutPassword } = user;
      return {
        message: 'El usuario fue guardado exitosamente',
        user: userWithoutPassword
      };
    } catch (error) {
      console.error('Error al crear usuario: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar todos los usuarios
   */
  async findAllUsers() {
    try {
      const users: UserEntity[] = await this.usersRepository.find({
        select: ['id', 'name', 'email', 'rol', 'createdAt'] // Excluir password
      });
      return { 
        count: users.length,
        users 
      };
    } catch (error) {
      console.error('Error al buscar todos los usuarios: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar usuario por ID
   */
  async findOneById(id: string): Promise<UserEntity | null | undefined> {
    if (!isUUID(id)) {
      throw new BadRequestException(`El término de búsqueda ingresado no es un ID válido`);
    }
    
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        select: ['id', 'name', 'email', 'rol', 'createdAt'] // Excluir password
      });
      
      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }
      return user;
    } catch (error) {
      console.error('Error al buscar usuario por ID - ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar usuario por email
   */
  async findOneByEmail(email: string): Promise<UserEntity | null | undefined> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
        select: ['id', 'name', 'email', 'rol', 'createdAt'] // Excluir password
      });
      
      if (!user) {
        throw new NotFoundException(`Usuario con email ${email} no encontrado`);
      }
      return user;
    } catch (error) {
      console.error('Error al buscar usuario por EMAIL: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Actualizar usuario
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    
    await this.findOneById(id); // Verificar primero que el usuario existe

    // Si se está actualizando el email, verificar que no exista otro usuario con ese email
    if (updateUserDto.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { 
          email: updateUserDto.email,
          id: id // Excluir el usuario actual de la verificación
        }
      });
      if (existingUser) {
        throw new BadRequestException(`El email ${updateUserDto.email} ya está registrado por otro usuario`);
      }
    }

    try {
      const userToUpdate = await this.usersRepository.preload({
        id,
        ...updateUserDto,
      });

      await this.usersRepository.save(userToUpdate!);
      const updatedUser = await this.findOneById(id); // Retornar usuario actualizado sin password
      return {
        message: 'Usuario actualizado exitosamente',
        user: updatedUser
      };
    } catch (error) {
      console.error('Error al actualizar información del usuario: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Eliminar usuario
   */
  async removeUser(id: string) {
    const user = await this.findOneById(id);
    await this.usersRepository.remove(user!);
    return {
      message: `Se ha eliminado el usuario con id: ${id}`,
      deletedUser: {
        id: user?.id,
        name: user?.name,
        email: user?.email
      }
    };
  }

  /**
   * ! Manejador de errores - error handler
   */
  handlerErrors(error: any) {
    this.logger.error(error.message);
    
    if (error instanceof BadRequestException || error instanceof NotFoundException) {
      throw error;
    }
    
    throw new BadRequestException(error.message);
  }
}