import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength, Matches } from "class-validator";
import { rolTypes } from "../interfaces/rolTypes";

export class UpdateUserDto extends PartialType (CreateUserDto) {
    
    // Sobrescribimos las validaciones para que sean opcionales en la actualización
    @IsString()
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @IsOptional()
    name?: string;

    @IsEmail({}, { message: 'El email debe tener un formato válido' })
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    })
    @IsOptional()
    password?: string;

    @IsEnum(rolTypes, { message: 'El rol debe ser Profesor o Estudiante' })
    @IsOptional()
    rol?: rolTypes;
}