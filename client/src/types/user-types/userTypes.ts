import { QueryFunctionContext, QueryKey } from '@tanstack/react-query';

export type UserLoginFormData = {
    username: string;
    password: string;
}

export type User = {
    id?: number | null;
    role?: string | null;
    name: string | null;
    user?: string | null;
    username: string | null;
    password: string | null;
    status: string | null;
    token?: string | null;
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

export type QueryFunc<T = unknown, TQueryKey extends QueryKey = QueryKey, TPageParam = never> = (context: QueryFunctionContext<TQueryKey, TPageParam>) => T | Promise<T>

export type UserTuple = Partial<User> | Partial<FetchUser> | Partial<FetchUser[]>;