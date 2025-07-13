import { Account, AccountType } from '@prisma/client';

export interface CreateAccountData {
    name: string;
    type: AccountType;
    balance: number;
    userId: string;
}

export interface AccountRepository {
    create(accountData: CreateAccountData): Promise<Account>;
    findById(id: string): Promise<Account | null>;
    findByUserId(userId: string): Promise<Account[]>;
    update(id: string, accountData: Partial<CreateAccountData>): Promise<Account>;
    delete(id: string): Promise<void>;
}
