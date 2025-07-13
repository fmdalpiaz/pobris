import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '@/domain/repositories/userRepository';
import { LoginUserDto, AuthResponseDto } from '@/application/dto/authDto';

export class LoginUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(loginData: LoginUserDto): Promise<AuthResponseDto> {
        const user = await this.userRepository.findByEmail(loginData.email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(loginData.password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        };
    }
}
