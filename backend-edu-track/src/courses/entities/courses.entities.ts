import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "../interfaces/course.interface";
import { TeacherEntity } from "src/teachers/entities/teachers.entities";

@Entity({ name: 'courses' })
export class CourseEntity implements Course {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column('integer')
  credits: number;

  @Column({
    name: 'profesor_id',
    type: 'uuid'
  })
  teacherId: string;

  // Relación con Teacher
  @ManyToOne(() => TeacherEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'profesor_id' })
  teacher: TeacherEntity;
}