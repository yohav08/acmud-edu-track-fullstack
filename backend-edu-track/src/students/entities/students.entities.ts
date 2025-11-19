import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Student } from "../interfaces/student.interface";
import { UserEntity } from "src/users/entities/users.entities";

@Entity({ name: 'students' })
export class StudentEntity implements Student {
  
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'anio_ingreso', type: 'smallint' })
  anio_ingreso: number;

  // Relación con User
  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' }) // La FK es la misma PK
  user: UserEntity;
}