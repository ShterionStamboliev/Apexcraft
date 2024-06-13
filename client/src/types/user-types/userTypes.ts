export type UserLoginFormData = {
    username: string;
    password: string;
}

export type User = {
    id?: string | null;
    role?: string | null;
    name?: string | null;
    user?: string | null;
    username?: string | null;
    password?: string | null;
    status?: string | null;
    token?: string | null;
}