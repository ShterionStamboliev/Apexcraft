import { FetchUser, User } from './userTypes';

export enum UserActionType {
    CREATE_USER_REQUEST = 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
    CREATE_USER_ERROR = 'CREATE_USER_ERROR',
    GET_USER_REQUEST = 'GET_USER_REQUEST',
    GET_USER_SUCCESS = 'GET_USER_SUCCESS',
    GET_USER_ERROR = 'GET_USER_ERROR',
    GET_USERS_REQUEST = 'GET_USERS_REQUEST',
    GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
    GET_USERS_ERROR = 'GET_USERS_ERROR',
    USER_STATUS_REQUEST = 'USER_STATUS_REQUEST',
    USER_STATUS_SUCCESS = 'SER_STATUS_SUCCESS',
    USER_STATUS_ERROR = 'USER_STATUS_ERROR',
    EDIT_USER_REQUEST = 'EDIT_USER_REQUEST',
    EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS',
    EDIT_USER_ERROR = 'EDIT_USER_ERROR',
}

export type UserContextProps = {
    state: {
        user: FetchUser[];
    }
    isLoading?: boolean;
    isUserLoading?: boolean;
    error?: string;
    createUser: (user: User) => Promise<boolean>;
    getUser: (userId: string | undefined) => Promise<FetchUser | null>;
    getUsers: () => Promise<FetchUser[]>;
    changeUserStatus?: (userId: string) => Promise<boolean>;
    editUser: (userId: string, user: FetchUser) => Promise<boolean>;
}

export interface UserAction {
    type: UserActionType;
    payload?: any;
}