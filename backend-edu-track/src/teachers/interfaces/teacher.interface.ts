import { User } from "src/users/interfaces/user.interface";

export interface Teacher {
  id: string; // Mismo ID que el usuario
  especialidad: string;
  id_user?: User; // Relación con User
}