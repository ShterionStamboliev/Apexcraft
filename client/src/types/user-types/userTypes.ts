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
    name_and_family: string;
    status: 'активен' | 'неактивен';
    role: 'потребител' | 'мениджър';
}

export type FetchUser = {
    id?: number;
    name_and_family: string;
    username: string;
    password: string;
    role: 'потребител' | 'мениджър';
    status: 'активен' | 'неактивен';
}

export type UserFormType = {
    id?: number;
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


export type UserTuple = Partial<User> | Partial<FetchUser> | Partial<FetchUser[]>;