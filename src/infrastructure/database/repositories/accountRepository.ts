import { Account } from '@prisma/client';
import { prisma } from '@/infrastructure/database/prisma';
import { AccountRepository, CreateAccountData } from '@/domain/repositories/accountRepository';

export class PrismaAccountRepository implements AccountRepository {
    async create(accountData: CreateAccountData): Promise<Account> {
        return await prisma.account.create({
            data: accountData
        });
    }

    async findById(id: string): Promise<Account | null> {
        return await prisma.account.findUnique({
            where: { id }
        });
    }

    async findByUserId(userId: string): Promise<Account[]> {
        return await prisma.account.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    }

    async update(id: string, accountData: Partial<CreateAccountData>): Promise<Account> {
        return await prisma.account.update({
            where: { id },
            data: accountData
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.account.delete({
            where: { id }
        });
    }
}
