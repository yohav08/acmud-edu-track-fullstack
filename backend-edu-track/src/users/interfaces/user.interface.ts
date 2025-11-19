import { rolTypes } from "./rolTypes";

export interface User {
  id: string; // String para UUID
  name: string;
  email: string;
  password: string; 
  rol?: rolTypes;
  createdAt?: Date; 
}