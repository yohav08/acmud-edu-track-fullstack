import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes, ValidationPipe} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  /**
   * ! Crear estudiante 
   */
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createStudent(createStudentDto);
  }

  /**
   * ! Buscar todos los estudiantes
   */
  @Get('getAllStudents')
  getAllStudents() {
    return this.studentsService.findAllStudents();
  }

  /**
   * ! Buscar estudiante por ID
   */
  @Get(':id')
  getStudentById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) 
    id: string
  ) {
    return this.studentsService.findStudentById(id);
  }

  /**
   * ! Actualizar estudiante 
   */
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateStudent(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body()
    updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.updateStudent(id, updateStudentDto);
  }

  /**
   * ! Eliminar estudiante 
   */
  @Delete(':id')
  removeStudent(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.studentsService.removeStudent(id);
  }
}