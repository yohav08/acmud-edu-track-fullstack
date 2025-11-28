import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsUUID, Min, Max } from "class-validator";

export class CreateInscriptionDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return new Date(); // Convierte el string ISO a Date object
    return new Date(value);
  })
  @IsDate({ message: 'La fecha de inscripción debe ser una fecha válida' })
  fecha_inscripcion?: Date;

  @IsNumber({}, { message: 'La nota debe ser un número' })
  @Min(0, { message: 'La nota no puede ser menor a 0' })
  @Max(10, { message: 'La nota no puede ser mayor a 10' })
  @IsOptional()
  nota?: number;

  @IsUUID('4', { message: 'El ID del estudiante debe ser un UUID válido' })
  estudiante_id: string;

  @IsNumber({}, { message: 'El ID del curso debe ser un número' })
  @Min(1, { message: 'El ID del curso debe ser mayor a 0' })
  curso_id: number;
}