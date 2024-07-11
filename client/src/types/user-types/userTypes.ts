export type UserLoginFormData = {
    username: string;
    password: string;
}

export type User = {
    id?: number;
    name?: string;
    user?: string;
    username: string;
    password: string;
    token?: string;
    name_and_family?: string;
    status: 'active' | 'inactive';
    role: 'user' | 'manager' | '';
}

export type FetchUser = {
    id?: number;
    name_and_family: string;
    username: string;
    password: string;
    role: 'user' | 'manager';
    status: 'active' | 'inactive';
}

export type UserFormType = {
    id?: number;
    name_and_family?: string;
    username: string;
    password: string;
    role: 'user' | 'manager' | '';
    status: 'active' | 'inactive';
}

export interface UserFormProps {
    onSuccess?: () => void;
    user: UserFormType;
}


export type UserTuple = Partial<User> | Partial<FetchUser> | Partial<FetchUser[]>;