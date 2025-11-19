import { User } from "src/users/interfaces/user.interface";

export interface Student {
  id: string; // Mismo ID que el usuario
  anio_ingreso: number;
  user?: User;// Relación con User
}