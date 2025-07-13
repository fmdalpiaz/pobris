import { User } from '@prisma/client';

export interface CreateUserData {
    email: string;
    password: string;
    name: string;
}

export interface UserRepository {
    create(userData: CreateUserData): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    update(id: string, userData: Partial<CreateUserData>): Promise<User>;
    delete(id: string): Promise<void>;
}
