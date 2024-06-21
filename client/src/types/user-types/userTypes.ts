export type UserLoginFormData = {
    username: string;
    password: string;
}

export type User = {
    id?: string | null;
    role?: string | null;
    name: string | null;
    user?: string | null;
    username: string | null;
    password: string | null;
    status: string | null;
    token?: string | null;
}

export type FetchUser = {
    id?: string;
    name_and_family: string;
    username: string;
    password: string;
    role: 'потребител' | 'мениджър';
    status: 'активен' | 'неактивен';
}

export type UserFormType = {
    id?: string;
    name_and_family: string;
    username: string;
    password: string;
    role: 'потребител' | 'мениджър';
    status: 'активен' | 'неактивен';
}

export interface UserFormProps {
    onSuccess?: () => void;
    user: UserFormType;
}