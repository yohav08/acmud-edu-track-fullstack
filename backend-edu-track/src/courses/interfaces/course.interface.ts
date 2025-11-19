import { Teacher } from "src/teachers/interfaces/teacher.interface";

export interface Course {
  id: string;  // UUID
  name: string;
  description?: string; 
  credits: number; 
  teacherId: string; // profesor_id
  teacher?: Teacher; // Relación con Teacher
}