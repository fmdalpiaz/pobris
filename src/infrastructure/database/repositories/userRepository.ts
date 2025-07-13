import { User } from '@prisma/client';
import { prisma } from '@/infrastructure/database/prisma';
import { UserRepository, CreateUserData } from '@/domain/repositories/userRepository';

export class PrismaUserRepository implements UserRepository {
    async create(userData: CreateUserData): Promise<User> {
        return await prisma.user.create({
            data: userData
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: { id }
        });
    }

    async update(id: string, userData: Partial<CreateUserData>): Promise<User> {
        return await prisma.user.update({
            where: { id },
            data: userData
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        });
    }
}
