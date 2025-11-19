import { IsEmail, IsEnum, IsOptional, IsString, MinLength, Matches } from "class-validator";
import { rolTypes } from "../interfaces/rolTypes";

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    name: string;

    @IsEmail({}, { message: 'El email debe tener un formato válido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    })
    password: string;

    @IsEnum(rolTypes, { message: 'El rol debe ser Profesor o Estudiante' })
    @IsOptional()
    rol?: rolTypes;
}