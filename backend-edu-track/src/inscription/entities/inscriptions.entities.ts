import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Inscription } from "../interfaces/inscription.interface";
import { StudentEntity } from "src/students/entities/students.entities";
import { CourseEntity } from "src/courses/entities/courses.entities";

@Entity({ name: 'inscriptions' })
@Unique(['estudiante_id', 'curso_id']) // Restricción única para evitar duplicados
export class InscriptionEntity implements Inscription {
  
   @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE' 
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
    type: 'int'
  })
  curso_id: number;

  // Relación con Student
  @ManyToOne(() => StudentEntity )
  @JoinColumn({ name: 'estudiante_id' })
  student: StudentEntity;

  // Relación con Course
  @ManyToOne(() => CourseEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'curso_id' })
  course: CourseEntity;
}