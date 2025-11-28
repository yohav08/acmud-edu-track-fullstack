import { IsString, IsNumber, IsOptional, IsUUID, Min, Max, MinLength, MaxLength } from "class-validator";

export class CreateCourseDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(255, { message: 'El nombre no puede exceder los 255 caracteres' })
  name: string;

  @IsString({ message: 'La descripción debe ser un texto' })
  @IsOptional()
  @MaxLength(1000, { message: 'La descripción no puede exceder los 1000 caracteres' })
  description?: string;

  @IsNumber({}, { message: 'Los créditos deben ser un número' })
  @Min(1, { message: 'Los créditos deben ser al menos 1' })
  @Max(10, { message: 'Los créditos no pueden ser más de 10' })
  credits: number;

  @IsUUID('4', { message: 'El ID del profesor debe ser un UUID válido' })
  teacherId: string;
}