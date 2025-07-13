import { Request, Response } from 'express';
import { PrismaAccountRepository } from '@/infrastructure/database/repositories/accountRepository';
import { ApiResponseUtil } from '@/shared/utils/response';
import { createAccountSchema, updateAccountSchema } from '@/presentation/validators/accountValidator';

export class AccountController {
    private accountRepository = new PrismaAccountRepository();

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { error } = createAccountSchema.validate(req.body);
            if (error) {
                ApiResponseUtil.error(res, 'Validation failed', 400, [error.details[0].message]);
                return;
            }

            const account = await this.accountRepository.create({
                ...req.body,
                userId: req.user!.id // Usamos ! porque sabemos que passou pelo middleware
            });

            ApiResponseUtil.created(res, account, 'Account created successfully');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create account';
            ApiResponseUtil.error(res, message, 400);
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const accounts = await this.accountRepository.findByUserId(req.user!.id);
            ApiResponseUtil.success(res, accounts);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch accounts';
            ApiResponseUtil.error(res, message, 500);
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const account = await this.accountRepository.findById(req.params.id);

            if (!account) {
                ApiResponseUtil.error(res, 'Account not found', 404);
                return;
            }

            ApiResponseUtil.success(res, account);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch account';
            ApiResponseUtil.error(res, message, 500);
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { error } = updateAccountSchema.validate(req.body);
            if (error) {
                ApiResponseUtil.error(res, 'Validation failed', 400, [error.details[0].message]);
                return;
            }

            const account = await this.accountRepository.update(req.params.id, req.body);
            ApiResponseUtil.success(res, account, 'Account updated successfully');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to update account';
            ApiResponseUtil.error(res, message, 400);
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            await this.accountRepository.delete(req.params.id);
            ApiResponseUtil.success(res, null, 'Account deleted successfully');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete account';
            ApiResponseUtil.error(res, message, 400);
        }
    }
}
