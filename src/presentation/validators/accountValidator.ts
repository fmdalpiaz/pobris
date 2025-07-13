import Joi from 'joi';
import { AccountType } from '@prisma/client';

export const createAccountSchema = Joi.object({
    name: Joi.string().min(2).required(),
    type: Joi.string().valid(...Object.values(AccountType)).required(),
    balance: Joi.number().min(0).required()
});

export const updateAccountSchema = Joi.object({
    name: Joi.string().min(2).optional(),
    type: Joi.string().valid(...Object.values(AccountType)).optional(),
    balance: Joi.number().min(0).optional(),
    isActive: Joi.boolean().optional()
});
