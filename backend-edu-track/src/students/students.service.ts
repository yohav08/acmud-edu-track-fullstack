import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './entities/students.entities';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger('StudentsService');

  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentsRepository: Repository<StudentEntity>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * ! Método para crear estudiante 
   */
  async createStudent(createStudentDto: CreateStudentDto) {
    try {
      // Verificar que el usuario existe
      const user = await this.usersService.findOneById(createStudentDto.id);
      if (!user) {
        throw new NotFoundException(`Usuario con id ${createStudentDto.id} no encontrado`);
      }

      // Verificar que el usuario tenga rol de Estudiante
      if (user.rol !== 'Estudiante') {
        throw new BadRequestException('El usuario debe tener el rol de Estudiante');
      }

      // Verificar que no exista ya un student con este ID
      const existingStudent = await this.studentsRepository.findOne({
        where: { id: createStudentDto.id }
      });
      
      if (existingStudent) {
        throw new BadRequestException(`Ya existe un estudiante con el id ${createStudentDto.id}`);
      }

      const student = this.studentsRepository.create(createStudentDto);
      await this.studentsRepository.save(student);
      
      return {
        message: 'El estudiante fue guardado exitosamente',
        student: {
          id: student.id,
          anio_ingreso: student.anio_ingreso,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol
          }
        }
      };
    } catch (error) {
        console.error('Error al crear estudiante: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar todos los estudiantes
   */
  async findAllStudents() {
    try {
      const students = await this.studentsRepository.find({
        relations: ['user'],
        select: {
          id: true,
          anio_ingreso: true,
          user: {
            id: true,
            name: true,
            email: true,
            rol: true,
            createdAt: true
          }
        }
      });
      
      return { 
        count: students.length,
        students 
      };
    } catch (error) {
        console.error('Error al buscar todos los estudiantes: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar estudiante por ID
   */
  async findStudentById(id: string): Promise<StudentEntity | null | undefined> {
    if (!isUUID(id)) {
      throw new BadRequestException(`El término de búsqueda ingresado no es un ID válido`);
    }
    
    try {
      const student = await this.studentsRepository.findOne({
        where: { id },
        relations: ['user'],
        select: {
          id: true,
          anio_ingreso: true,
          user: {
            id: true,
            name: true,
            email: true,
            rol: true,
            createdAt: true
          }
        }
      });
      
      if (!student) {
        throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
      }
      return student;
    } catch (error) {
      console.error('Error al buscar estudiante por ID: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Actualizar estudiante
   */
  async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
    // Verificar que el estudiante existe
    await this.findStudentById(id);

    try {
      const studentToUpdate = await this.studentsRepository.preload({
        id,
        ...updateStudentDto,
      });

      await this.studentsRepository.save(studentToUpdate!);
      
      // Retornar estudiante actualizado
      const updatedStudent = await this.findStudentById(id);
      return {
        message: 'Estudiante actualizado exitosamente',
        student: updatedStudent
      };
    } catch (error) {
      console.error('Error al actualizar información del estudiante: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Eliminar estudiante
   */
  async removeStudent(id: string) {
    try {
      const student = await this.findStudentById(id);
      await this.studentsRepository.remove(student!);
      
      return {
        message: `Se ha eliminado el estudiante con id: ${id}`,
        deletedStudent: {
          id: student?.id,
          anio_ingreso: student?.anio_ingreso,
          user: {
            id: student?.user.id,
            name: student?.user.name,
            email: student?.user.email
          }
        }
      };
    } catch (error) {
      console.error('Error al eliminar estudiante: ', error.message);
      this.handlerErrors(error);
    }
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