import { IsString, MinLength, IsOptional } from "class-validator";

export class UpdateTeacherDto {

    // No se permite actualizar el ID por seguridad
    @IsString({ message: 'La especialidad debe ser un texto' })
    @MinLength(3, { message: 'La especialidad debe tener al menos 3 caracteres' })
    @IsOptional()
    especialidad?: string;
}