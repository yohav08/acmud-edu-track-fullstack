import { IsNumber, Min, Max, IsInt, IsOptional } from "class-validator";

export class UpdateStudentDto {

    // No se permite actualizar el ID por seguridad    
    @IsNumber({}, { message: 'El año de ingreso debe ser un número' })
    @IsInt({ message: 'El año de ingreso debe ser un número entero' })
    @Min(2000, { message: 'El año de ingreso no puede ser menor a 2000' })
    @Max(2030, { message: 'El año de ingreso no puede ser mayor a 2030' })
    @IsOptional()
    anio_ingreso?: number;
}