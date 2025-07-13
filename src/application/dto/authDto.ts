export interface RegisterUserDto {
    email: string;
    password: string;
    name: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface AuthResponseDto {
    user: {
        id: string;
        email: string;
        name: string;
    };
    token: string;
}
