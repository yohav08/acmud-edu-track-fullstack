import { IsNumber, IsUUID, Min, Max, IsNotEmpty, IsInt } from "class-validator";

export class CreateStudentDto {
    @IsUUID('4', { message: 'El ID debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El ID del usuario es requerido' })
    id: string;

    @IsNumber({}, { message: 'El año de ingreso debe ser un número' })
    @IsInt({ message: 'El año de ingreso debe ser un número entero' })
    @Min(2000, { message: 'El año de ingreso no puede ser menor a 2000' })
    @Max(2030, { message: 'El año de ingreso no puede ser mayor a 2030' })
    @IsNotEmpty({ message: 'El año de ingreso es requerido' })
    anio_ingreso: number;
}