import { Request, Response, NextFunction } from 'express';
import { ApiResponseUtil } from '@/shared/utils/response';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    console.error('Error:', error);

    if (error.name === 'ValidationError') {
        ApiResponseUtil.error(res, 'Validation failed', 400, [error.message]);
        return;
    }

    if (error.name === 'PrismaClientKnownRequestError') {
        ApiResponseUtil.error(res, 'Database operation failed', 500);
        return;
    }

    ApiResponseUtil.error(res, 'Internal server error', 500);
};

export const notFoundHandler = (req: Request, res: Response): void => {
    ApiResponseUtil.error(res, 'Route not found', 404);
};
