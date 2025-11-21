import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * ! Crear usuario 
   */
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * ! Buscar todos los usuarios
   */
  @Get('getAllUsers')
  getAllUsers() {
    return this.usersService.findAllUsers();
  }

  /**
   * ! Buscar usuario por ID
   */
  @Get(':id')
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) 
    id: string
  ) {
    return this.usersService.findOneById(id);
  }

  /**
   * ! Buscar usuario por EMAIL 
   */
  @Get('email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  /**
   * ! Actualizar usuario 
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  /**
   * ! Eliminar usuario 
   */
  @Delete(':id')
  removeUser(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.usersService.removeUser(id);
  }
}