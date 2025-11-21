import { BadRequestException, Injectable, Logger, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherEntity } from './entities/teachers.entities';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TeachersService {
  private readonly logger = new Logger('TeachersService');

  constructor(
    @InjectRepository(TeacherEntity)
    private readonly teachersRepository: Repository<TeacherEntity>,
    private readonly usersService: UsersService,
  ) {}

  // 🆕 CREATE TEACHER
  async createTeacher(createTeacherDto: CreateTeacherDto) {
    try {
      // Verificar que el usuario existe
      const user = await this.usersService.findOneById(createTeacherDto.id);
      if (!user) {
        throw new NotFoundException(`Usuario con id ${createTeacherDto.id} no encontrado`);
      }

      // Verificar que el usuario tenga rol de Profesor
      if (user.rol !== 'Profesor') {
        throw new BadRequestException('El usuario debe tener el rol de Profesor');
      }

      // Verificar que no exista ya un teacher con este ID
      const existingTeacher = await this.teachersRepository.findOne({
        where: { id: createTeacherDto.id }
      });
      
      if (existingTeacher) {
        throw new BadRequestException(`Ya existe un profesor con el id ${createTeacherDto.id}`);
      }

      const teacher = this.teachersRepository.create(createTeacherDto);
      await this.teachersRepository.save(teacher);
      
      return {
        message: 'El profesor fue guardado exitosamente',
        teacher: {
          id: teacher.id,
          especialidad: teacher.especialidad,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol
          }
        }
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // 📋 FIND ALL TEACHERS
  async findAllTeachers() {
    try {
      const teachers = await this.teachersRepository.find({
        relations: ['id_user'],
        select: {
          id: true,
          especialidad: true,
          id_user: {
            id: true,
            name: true,
            email: true,
            rol: true,
            createdAt: true
          }
        }
      });
      
      return { 
        count: teachers.length,
        teachers 
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // 🔍 FIND TEACHER BY ID
  async findTeacherById(id: string): Promise<TeacherEntity | null | undefined> {
    if (!isUUID(id)) {
      throw new BadRequestException(`El término de búsqueda ingresado no es un ID válido`);
    }
    
    try {
      const teacher = await this.teachersRepository.findOne({
        where: { id },
        relations: ['id_user'],
        select: {
          id: true,
          especialidad: true,
          id_user: {
            id: true,
            name: true,
            email: true,
            rol: true,
            createdAt: true
          }
        }
      });
      
      if (!teacher) {
        throw new NotFoundException(`Profesor con id ${id} no encontrado`);
      }
      return teacher;
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // 📚 FIND TEACHER BY ESPECIALIDAD (NUEVO MÉTODO)
  async findTeacherByEspecialidad(especialidad: string) {
    try {
      const teachers = await this.teachersRepository.find({
        where: { especialidad },
        relations: ['id_user'],
        select: {
          id: true,
          especialidad: true,
          id_user: {
            id: true,
            name: true,
            email: true,
            rol: true,
            createdAt: true
          }
        }
      });
      
      if (teachers.length === 0) {
        throw new NotFoundException(`No se encontraron profesores con la especialidad: ${especialidad}`);
      }
      
      return {
        count: teachers.length,
        especialidad,
        teachers
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // ✏️ UPDATE TEACHER
  async updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto) {
    // Verificar que el profesor existe
    await this.findTeacherById(id);

    try {
      const teacherToUpdate = await this.teachersRepository.preload({
        id,
        ...updateTeacherDto,
      });

      await this.teachersRepository.save(teacherToUpdate!);
      
      // Retornar profesor actualizado
      const updatedTeacher = await this.findTeacherById(id);
      return {
        message: 'Profesor actualizado exitosamente',
        teacher: updatedTeacher
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // 🗑️ REMOVE TEACHER
  async removeTeacher(id: string) {
    try {
      const teacher = await this.findTeacherById(id);
      await this.teachersRepository.remove(teacher!);
      
      return {
        message: `Se ha eliminado el profesor con id: ${id}`,
        deletedTeacher: {
          id: teacher?.id,
          especialidad: teacher?.especialidad,
          user: {
            id: teacher?.id_user.id,
            name: teacher?.id_user.name,
            email: teacher?.id_user.email
          }
        }
      };
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  // 🚨 ERROR HANDLER
  handlerErrors(error: any) {
    this.logger.error(error.message);
    
    if (error instanceof BadRequestException || error instanceof NotFoundException) {
      throw error;
    }
    
    throw new BadRequestException(error.message);
  }
}