import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from "class-validator";
import { rolTypes } from 'src/users/interfaces/rolTypes';
import { User } from '../interfaces/user.interface';

@Entity({name: 'users'})
export class UserEntity implements User{
  
    @PrimaryGeneratedColumn('uuid') // Es UUID
    id: string;
  
    @Column('text')
    name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({
        type: 'enum',
        enum: rolTypes
    })
    @IsOptional()
    rol?: rolTypes;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

}