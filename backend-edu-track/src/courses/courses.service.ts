import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/courses.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger('CoursesService');

  constructor(
    @InjectRepository(CourseEntity)
    private readonly coursesRepository: Repository<CourseEntity>,
    private readonly teachersService: TeachersService,
  ) {}

  /**
   * ! Método para crear curso 
   */
  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      // Verificar que el profesor existe
      const teacher = await this.teachersService.findTeacherById(createCourseDto.teacherId);
      if (!teacher) {
        throw new NotFoundException(`Profesor con id ${createCourseDto.teacherId} no encontrado`);
      }

      // Verificar que no exista ya un curso con el mismo nombre
      const existingCourse = await this.coursesRepository.findOne({
        where: { name: createCourseDto.name }
      });
      
      if (existingCourse) {
        throw new BadRequestException(`Ya existe un curso con el nombre ${createCourseDto.name}`);
      }

      const course = this.coursesRepository.create(createCourseDto);
      await this.coursesRepository.save(course);
      
      return {
        message: 'El curso fue guardado exitosamente',
        course: {
          id: course.id,
          name: course.name,
          description: course.description,
          credits: course.credits,
          teacherId: course.teacherId
        }
      };
    } catch (error) {
      console.error('Error al crear curso: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar todos los cursos
   */
  async findAllCourses() {
    try {
      const courses = await this.coursesRepository.find({
        relations: ['teacher'],
        select: {
          id: true,
          name: true,
          description: true,
          credits: true,
          teacherId: true,
          teacher: {
            id: true,
            especialidad: true,
            id_user: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      
      return { 
        count: courses.length,
        courses 
      };
    } catch (error) {
      console.error('Error al buscar todos los cursos: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar curso por ID
   */
  async findCourseById(id: number) {
    try {
      const course = await this.coursesRepository.findOne({
        where: { id },
        relations: ['teacher'],
        select: {
          id: true,
          name: true,
          description: true,
          credits: true,
          teacherId: true,
          teacher: {
            id: true,
            especialidad: true,
            id_user: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      
      if (!course) {
        throw new NotFoundException(`Curso con id ${id} no encontrado`);
      }
      return course;
    } catch (error) {
      console.error('Error al buscar curso por ID: ', error.message); 
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar curso por nombre
   */
  async findCoursesByName(name: string) {
    try {
      const courses = await this.coursesRepository.find({
        where: { name: Like(`%${name}%`) },
        relations: ['teacher'],
        select: {
          id: true,
          name: true,
          description: true,
          credits: true,
          teacherId: true,
          teacher: {
            id: true,
            especialidad: true,
            id_user: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      
      if (courses.length === 0) {
        throw new NotFoundException(`No se encontraron cursos con el nombre: ${name}`);
      }
      
      return {
        count: courses.length,
        searchTerm: name,
        courses
      };
    } catch (error) {
      console.error('Error al buscar cursos por nombre: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar cursos por profesor
   */
  async findCoursesByTeacher(teacherId: string) {
    try {
      // Verificar que el profesor existe
      await this.teachersService.findTeacherById(teacherId);

      const courses = await this.coursesRepository.find({
        where: { teacherId },
        relations: ['teacher'],
        select: {
          id: true,
          name: true,
          description: true,
          credits: true,
          teacherId: true,
          teacher: {
            id: true,
            especialidad: true,
            id_user: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      
      if (courses.length === 0) {
        throw new NotFoundException(`No se encontraron cursos para el profesor con id ${teacherId}`);
      }
      
      return {
        count: courses.length,
        teacherId,
        courses
      };
    } catch (error) {
      console.error('Error al buscar cursos por profesor: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Actualizar curso
   */
  async updateCourse(id: number, updateCourseDto: UpdateCourseDto) {
    // Verificar que el curso existe
    await this.findCourseById(id);

    // Si se está actualizando el nombre, verificar que no exista otro curso con ese nombre
    if (updateCourseDto.name) {
      const existingCourse = await this.coursesRepository.findOne({
        where: { 
          name: updateCourseDto.name,
          id: id // Excluir el curso actual de la verificación
        }
      });
      
      if (existingCourse) {
        throw new BadRequestException(`Ya existe un curso con el nombre ${updateCourseDto.name}`);
      }
    }

    // Si se está actualizando el teacherId, verificar que el profesor existe
    if (updateCourseDto.teacherId) {
      await this.teachersService.findTeacherById(updateCourseDto.teacherId);
    }

    try {
      const courseToUpdate = await this.coursesRepository.preload({
        id,
        ...updateCourseDto,
      });

      await this.coursesRepository.save(courseToUpdate!);
      
      // Retornar curso actualizado
      const updatedCourse = await this.findCourseById(id);
      return {
        message: 'Curso actualizado exitosamente',
        course: updatedCourse
      };
    } catch (error) {
      console.error('Error al actualizar información del curso: ', error.message);
      this.handlerErrors(error);
    }
  }

  /** 
   * ! Método para Eliminar curso
   */ 
  async removeCourse(id: number) {
    try {
      const course = await this.findCourseById(id);
      await this.coursesRepository.remove(course!);
      
      return {
        message: `Se ha eliminado el curso con id: ${id}`,
        deletedCourse: {
          id: course?.id,
          name: course?.name,
          credits: course?.credits,
          teacherId: course?.teacherId
        }
      };
    } catch (error) {
      console.error('Error al eliminar curso: ', error.message);
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