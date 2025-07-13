import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '@/domain/repositories/userRepository';
import { RegisterUserDto, AuthResponseDto } from '@/application/dto/authDto';

export class RegisterUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(userData: RegisterUserDto): Promise<AuthResponseDto> {
        const existingUser = await this.userRepository.findByEmail(userData.email);

        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await this.userRepository.create({
            ...userData,
            password: hashedPassword
        });

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
