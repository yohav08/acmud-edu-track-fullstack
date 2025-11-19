import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Inscription } from "../interfaces/inscription.interface";
import { StudentEntity } from "src/students/entities/students.entities";
import { CourseEntity } from "src/courses/entities/courses.entities";

@Entity({ name: 'inscriptions' })
@Unique(['studentId', 'courseId']) // Restricción única para evitar duplicados
export class InscriptionEntity implements Inscription {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'fecha_inscripcion',
    type: 'date'
  })
  fecha_inscripcion: Date;

  @Column({ type: "decimal", precision: 3, scale: 2, nullable: true })
  nota?: number;

  @Column({
    name: 'estudiante_id',
    type: 'uuid'
  })
  estudiante_id: string;

  @Column({
    name: 'curso_id',
    type: 'uuid'
  })
  curso_id: string;

  // Relación con Student
  @ManyToOne(() => StudentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'estudiante_id' })
  student: StudentEntity;

  // Relación con Course
  @ManyToOne(() => CourseEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'curso_id' })
  course: CourseEntity;
}