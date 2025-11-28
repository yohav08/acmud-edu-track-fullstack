import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { InscriptionEntity } from './entities/inscriptions.entities';
import { StudentsService } from 'src/students/students.service';
import { CoursesService } from 'src/courses/courses.service';


@Injectable()
export class InscriptionsService {
  private readonly logger = new Logger('InscriptionsService');

  constructor(
    @InjectRepository(InscriptionEntity)
    private readonly inscriptionsRepository: Repository<InscriptionEntity>,
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService,
  ) {}

  /**
   * ! Método para crear inscripción 
   */
  async createInscription(createInscriptionDto: CreateInscriptionDto) {
    try {
      // Verificar que el estudiante existe
      const student = await this.studentsService.findStudentById(createInscriptionDto.estudiante_id);
      if (!student) {
        throw new NotFoundException(`Estudiante con id ${createInscriptionDto.estudiante_id} no encontrado`);
      }

      // Verificar que el curso existe
      const course = await this.coursesService.findCourseById(createInscriptionDto.curso_id);
      if (!course) {
        throw new NotFoundException(`Curso con id ${createInscriptionDto.curso_id} no encontrado`);
      }

      // Verificar que no exista ya una inscripción para este estudiante en este curso
      const existingInscription = await this.inscriptionsRepository.findOne({
        where: {
          estudiante_id: createInscriptionDto.estudiante_id,
          curso_id: createInscriptionDto.curso_id
        }
      });
      
      if (existingInscription) {
        throw new BadRequestException(`El estudiante ya está inscrito en este curso`);
      }

      const inscription = this.inscriptionsRepository.create(createInscriptionDto);
      await this.inscriptionsRepository.save(inscription);
      
      return {
        message: 'La inscripción fue guardada exitosamente',
        inscription: {
          id: inscription.id,
          fecha_inscripcion: inscription.fecha_inscripcion,
          nota: inscription.nota,
          estudiante_id: inscription.estudiante_id,
          curso_id: inscription.curso_id
        }
      };
    } catch (error) {
      console.error('Error al crear inscripción: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar todas las inscripciones
   */
  async findAllInscriptions() {
    try {
      const inscriptions = await this.inscriptionsRepository.find({
        relations: ['student', 'course'],
        select: {
          id: true,
          fecha_inscripcion: true,
          nota: true,
          estudiante_id: true,
          curso_id: true,
          student: {
            id: true,
            anio_ingreso: true,
            user: {
              id: true,
              name: true,
              email: true
            }
          },
          course: {
            id: true,
            name: true,
            description: true,
            credits: true
          }
        }
      });
      
      return { 
        count: inscriptions.length,
        inscriptions 
      };
    } catch (error) {
      console.error('Error al buscar todas las inscripciones: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar inscripción por ID
   */  
  async findInscriptionById(id: number) {
    try {
      const inscription = await this.inscriptionsRepository.findOne({
        where: { id },
        relations: ['student', 'course'],
        select: {
          id: true,
          fecha_inscripcion: true,
          nota: true,
          estudiante_id: true,
          curso_id: true,
          student: {
            id: true,
            anio_ingreso: true,
            user: {
              id: true,
              name: true,
              email: true
            }
          },
          course: {
            id: true,
            name: true,
            description: true,
            credits: true
          }
        }
      });
      
      if (!inscription) {
        throw new NotFoundException(`Inscripción con id ${id} no encontrada`);
      }
      return inscription;
    } catch (error) {
      console.error('Error al buscar inscripción por ID: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar inscrpciones por fecha
   */  
  async findInscriptionsByDate(fecha: string) {
    try {
      const date = new Date(fecha);
      if (isNaN(date.getTime())) {
        throw new BadRequestException('Formato de fecha inválido. Use YYYY-MM-DD');
      }

      const inscriptions = await this.inscriptionsRepository.find({
        where: { fecha_inscripcion: date },
        relations: ['student', 'course'],
        select: {
          id: true,
          fecha_inscripcion: true,
          nota: true,
          estudiante_id: true,
          curso_id: true,
          student: {
            id: true,
            anio_ingreso: true,
            user: {
              id: true,
              name: true,
              email: true
            }
          },
          course: {
            id: true,
            name: true,
            description: true,
            credits: true
          }
        }
      });
      
      if (inscriptions.length === 0) {
        throw new NotFoundException(`No se encontraron inscripciones para la fecha ${fecha}`);
      }
      
      return {
        count: inscriptions.length,
        fecha,
        inscriptions
      };
    } catch (error) {
      console.error('Error al buscar inscripciones por fecha: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar inscrpciones por estudiante
   */  
  async findInscriptionsByStudent(estudiante_id: string) {
    try {
      // Verificar que el estudiante existe
      await this.studentsService.findStudentById(estudiante_id);

      const inscriptions = await this.inscriptionsRepository.find({
        where: { estudiante_id },
        relations: ['student', 'course'],
        select: {
          id: true,
          fecha_inscripcion: true,
          nota: true,
          estudiante_id: true,
          curso_id: true,
          student: {
            id: true,
            anio_ingreso: true,
            user: {
              id: true,
              name: true,
              email: true
            }
          },
          course: {
            id: true,
            name: true,
            description: true,
            credits: true
          }
        }
      });
      
      if (inscriptions.length === 0) {
        throw new NotFoundException(`No se encontraron inscripciones para el estudiante con id ${estudiante_id}`);
      }
      
      return {
        count: inscriptions.length,
        estudiante_id,
        inscriptions
      };
    } catch (error) {
      console.error('Error al buscar inscripciones por estudiante: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Buscar inscrpciones por curso
   */
  async findInscriptionsByCourse(curso_id: number) {
    try {
      // Verificar que el curso existe
      await this.coursesService.findCourseById(curso_id);

      const inscriptions = await this.inscriptionsRepository.find({
        where: { curso_id },
        relations: ['student', 'course'],
        select: {
          id: true,
          fecha_inscripcion: true,
          nota: true,
          estudiante_id: true,
          curso_id: true,
          student: {
            id: true,
            anio_ingreso: true,
            user: {
              id: true,
              name: true,
              email: true
            }
          },
          course: {
            id: true,
            name: true,
            description: true,
            credits: true
          }
        }
      });
      
      if (inscriptions.length === 0) {
        throw new NotFoundException(`No se encontraron inscripciones para el curso con id ${curso_id}`);
      }
      
      return {
        count: inscriptions.length,
        curso_id,
        inscriptions
      };
    } catch (error) {
      console.error('Error al buscar inscripciones por curso: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para buscar inscripción con detalles completos
   */
  async findInscriptionsWithDetails() {
    try {
      const inscriptions = await this.inscriptionsRepository
        .createQueryBuilder('inscription')
        .leftJoinAndSelect('inscription.student', 'student')
        .leftJoinAndSelect('student.user', 'user')
        .leftJoinAndSelect('inscription.course', 'course')
        .leftJoinAndSelect('course.teacher', 'teacher')
        .leftJoinAndSelect('teacher.id_user', 'teacher_user')
        .select([
          'inscription.id',
          'inscription.fecha_inscripcion',
          'inscription.nota',
          'student.id',
          'student.anio_ingreso',
          'user.id',
          'user.name',
          'user.email',
          'course.id',
          'course.name',
          'course.description',
          'course.credits',
          'teacher.id',
          'teacher.especialidad',
          'teacher_user.name'
        ])
        .getMany();
      
      return {
        count: inscriptions.length,
        inscriptions
      };
    } catch (error) {
      console.error('Error al obtener inscripciones con detalles: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Actualizar inscripción
   */
  async updateInscription(id: number, updateInscriptionDto: UpdateInscriptionDto) {
    // Verificar que la inscripción existe
    await this.findInscriptionById(id);

    // Si se está actualizando estudiante_id, verificar que el estudiante existe
    if (updateInscriptionDto.estudiante_id) {
      await this.studentsService.findStudentById(updateInscriptionDto.estudiante_id);
    }

    // Si se está actualizando curso_id, verificar que el curso existe
    if (updateInscriptionDto.curso_id) {
      await this.coursesService.findCourseById(updateInscriptionDto.curso_id);
    }

    try {
      const inscriptionToUpdate = await this.inscriptionsRepository.preload({
        id,
        ...updateInscriptionDto,
      });

      await this.inscriptionsRepository.save(inscriptionToUpdate!);
      
      // Retornar inscripción actualizada
      const updatedInscription = await this.findInscriptionById(id);
      return {
        message: 'Inscripción actualizada exitosamente',
        inscription: updatedInscription
      };
    } catch (error) {
      console.error('Error al actualizar información de la inscripción: ', error.message);
      this.handlerErrors(error);
    }
  }

  /**
   * ! Método para Eliminar inscripción
   */
  async removeInscription(id: number) {
    try {
      const inscription = await this.findInscriptionById(id);
      await this.inscriptionsRepository.remove(inscription!);
      
      return {
        message: `Se ha eliminado la inscripción con id: ${id}`,
        deletedInscription: {
          id: inscription?.id,
          fecha_inscripcion: inscription?.fecha_inscripcion,
          estudiante_id: inscription?.estudiante_id,
          curso_id: inscription?.curso_id
        }
      };
    } catch (error) {
      console.error('Error al eliminar inscripción: ', error.message);
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