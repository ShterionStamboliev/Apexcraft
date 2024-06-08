export type UserLoginFormData = {
    username: string;
    password: string;
}

export type LoginFormProps = {
    title?: string;
    buttonText: string;
    isLoading: boolean;
}

export type User = {
    id?: string;
    user?: string;
    role?: string;
    token?: string;
    name?: string;
    username?: string;
    password?: string;
    status?: string;
}

export type CreateUserType = {
    id?: string;
    name: string;
    username: string;
    password: string;
    role: string;
    status: string;
    isLoading?: boolean;
    error?: undefined;
}