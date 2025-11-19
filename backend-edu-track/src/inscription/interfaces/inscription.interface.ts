import { Course } from "src/courses/interfaces/course.interface";
import { Student } from "src/students/interfaces/student.interface";

export interface Inscription {
  id: string; // UUID
  fecha_inscripcion: Date
  nota?: number;
  estudiante_id: string;
  curso_id: string;
  student?: Student; // Relación con Student
  course?: Course; // Relación con Course
}