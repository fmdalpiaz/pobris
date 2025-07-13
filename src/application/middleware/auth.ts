import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponseUtil } from '@/shared/utils/response';

interface JwtPayload {
    id: string;
    email: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        ApiResponseUtil.error(res, 'Access token is required', 401);
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = decoded;
        next();
    } catch {
        ApiResponseUtil.error(res, 'Invalid or expired token', 401);
        return;
    }
};
