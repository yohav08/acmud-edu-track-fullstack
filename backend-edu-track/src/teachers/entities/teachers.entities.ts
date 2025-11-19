import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Teacher } from "../interfaces/teacher.interface";
import { UserEntity } from "src/users/entities/users.entities";

@Entity({ name: 'teachers' })
export class TeacherEntity implements Teacher {
  
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  especialidad: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' }) // La FK es la misma PK
  id_user: UserEntity;
}