import { Timestamp } from "typeorm";

export class CreateUserDto {
    id: string;
    created_at: Timestamp;
    name: string;
    email: string;
    password: string;
    role: string;
    access_token: string;
  }