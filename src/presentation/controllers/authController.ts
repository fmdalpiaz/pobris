import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@/application/usecases/auth/registerUser';
import { LoginUserUseCase } from '@/application/usecases/auth/loginUser';
import { PrismaUserRepository } from '@/infrastructure/database/repositories/userRepository';
import { ApiResponseUtil } from '@/shared/utils/response';
import { registerSchema, loginSchema } from '@/presentation/validators/authValidator';

export class AuthController {
    private userRepository = new PrismaUserRepository();
    private registerUserUseCase = new RegisterUserUseCase(this.userRepository);
    private loginUserUseCase = new LoginUserUseCase(this.userRepository);

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { error } = registerSchema.validate(req.body);
            if (error) {
                ApiResponseUtil.error(res, 'Validation failed', 400, [error.details[0].message]);
                return;
            }

            const result = await this.registerUserUseCase.execute(req.body);
            ApiResponseUtil.created(res, result, 'User registered successfully');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            ApiResponseUtil.error(res, message, 400);
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { error } = loginSchema.validate(req.body);
            if (error) {
                ApiResponseUtil.error(res, 'Validation failed', 400, [error.details[0].message]);
                return;
            }

            const result = await this.loginUserUseCase.execute(req.body);
            ApiResponseUtil.success(res, result, 'Login successful');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            ApiResponseUtil.error(res, message, 401);
        }
    }
}
