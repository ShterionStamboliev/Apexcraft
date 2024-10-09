export type UserLoginFormData = {
    username: string;
    password: string;
}

export type User = {
    id?: string;
    name?: string;
    user?: string;
    username: string;
    password: string;
    token?: string;
    artisanName?: string;
    name_and_family: string;
    status: 'active' | 'inactive';
    role: 'user' | 'manager';
}

export type UserFormType = {
    id?: number;
    name_and_family?: string;
    username: string;
    password: string;
    role: 'user' | 'manager';
    status: 'active' | 'inactive';
}