import { PartialType } from '@nestjs/mapped-types';
import { CreateInscriptionDto } from './create-inscription.dto';
import { IsDate, IsNumber, IsOptional, IsUUID, Min, Max } from "class-validator";

export class UpdateInscriptionDto extends PartialType(CreateInscriptionDto) {
  
  @IsDate({ message: 'La fecha de inscripción debe ser una fecha válida' })
  @IsOptional()
  fecha_inscripcion?: Date;

  @IsNumber({}, { message: 'La nota debe ser un número' })
  @Min(0, { message: 'La nota no puede ser menor a 0' })
  @Max(10, { message: 'La nota no puede ser mayor a 10' })
  @IsOptional()
  nota?: number;

  @IsUUID('4', { message: 'El ID del estudiante debe ser un UUID válido' })
  @IsOptional()
  estudiante_id?: string;

  @IsNumber({}, { message: 'El ID del curso debe ser un número' })
  @Min(1, { message: 'El ID del curso debe ser mayor a 0' })
  @IsOptional()
  curso_id?: number;
}