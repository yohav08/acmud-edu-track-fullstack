import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  /**
   * ! Crear profesor 
   */
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.createTeacher(createTeacherDto);
  }

  /**
   * ! Buscar todos los profesores
   */
  @Get('getAllTeachers')
  getAllTeachers() {
    return this.teachersService.findAllTeachers();
  }

  /**
   * ! Buscar profesor por ID
   */
  @Get(':id')
  getTeacherById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) 
    id: string
  ) {
    return this.teachersService.findTeacherById(id);
  }

  /**
   * ! Buscar profesor por ESPECIALIDAD 
   */
  @Get('especialidad/:especialidad')
  getTeacherByEspecialidad(@Param('especialidad') especialidad: string) {
    return this.teachersService.findTeacherByEspecialidad(especialidad);
  }

  /**
   * ! Actualizar profesor 
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateTeacher(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body()
    updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teachersService.updateTeacher(id, updateTeacherDto);
  }

  /**
   * ! Eliminar profesor 
   */
  @Delete(':id')
  removeTeacher(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.teachersService.removeTeacher(id);
  }
}