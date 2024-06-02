export type UserLoginFormData = {
    username: string;
    password: string;
}

export type LoginFormProps = {
    title?: string;
    buttonText: string;
    isLoading: boolean;
};

export type User = {
    user?: string;
    role?: string;
    token?: string;
}