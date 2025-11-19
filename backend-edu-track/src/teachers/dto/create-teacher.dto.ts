import { IsString, IsUUID, MinLength, IsNotEmpty } from "class-validator";

export class CreateTeacherDto {
    @IsUUID('4', { message: 'El ID debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El ID del usuario es requerido' })
    id: string;

    @IsString({ message: 'La especialidad debe ser un texto' })
    @MinLength(3, { message: 'La especialidad debe tener al menos 3 caracteres' })
    @IsNotEmpty({ message: 'La especialidad es requerida' })
    especialidad: string;
}