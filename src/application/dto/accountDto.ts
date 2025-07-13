import { AccountType } from '@prisma/client';

export interface CreateAccountDto {
    name: string;
    type: AccountType;
    balance: number;
}

export interface UpdateAccountDto {
    name?: string;
    type?: AccountType;
    balance?: number;
    isActive?: boolean;
}

export interface AccountResponseDto {
    id: string;
    name: string;
    type: AccountType;
    balance: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
