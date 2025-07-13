import { Response } from 'express';
import { ApiResponse } from '@/shared/types';

export class ApiResponseUtil {
    static success<T>(res: Response, data?: T, message?: string): Response {
        const response: ApiResponse<T> = {
            success: true,
            data,
            message
        };
        return res.status(200).json(response);
    }

    static created<T>(res: Response, data?: T, message?: string): Response {
        const response: ApiResponse<T> = {
            success: true,
            data,
            message
        };
        return res.status(201).json(response);
    }

    static error(res: Response, message: string, statusCode: number = 400, errors?: string[]): Response {
        const response: ApiResponse = {
            success: false,
            message,
            errors
        };
        return res.status(statusCode).json(response);
    }
}
