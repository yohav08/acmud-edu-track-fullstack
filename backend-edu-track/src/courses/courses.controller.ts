import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe,  UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  /**
   * ! Crear curso 
   */
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.createCourse(createCourseDto);
  }

  /**
   * ! Buscar todos los cursos
   */
  @Get('getAllCourses')
  getAllCourses() {
    return this.coursesService.findAllCourses();
  }

  /**
   * ! Buscar curso por ID
   */
  @Get(':id')
  getCourseById(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findCourseById(id);
  }

  /**
   * ! Buscar cursos por nombre
   */
  @Get('nombre/:name')
  getCoursesByName(@Param('name') name: string) {
    return this.coursesService.findCoursesByName(name);
  }

  /**
   * ! Buscar cursos por profesor
   */
  @Get('profesor/:teacherId')
  getCoursesByTeacher(
    @Param('teacherId', new ParseUUIDPipe({ version: '4' })) 
    teacherId: string
  ) {
    return this.coursesService.findCoursesByTeacher(teacherId);
  }

  /**
   * ! Actualizar curso 
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateCourse(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.updateCourse(id, updateCourseDto);
  }

  /**
   * ! Eliminar curso 
   */
  @Delete(':id')
  removeCourse(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.removeCourse(id);
  }
}