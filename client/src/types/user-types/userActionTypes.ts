import { FetchUser, User, UserTuple } from './userTypes';

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
    EDIT_USER_REQUEST = 'EDIT_USER_REQUEST',
    EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS',
    EDIT_USER_ERROR = 'EDIT_USER_ERROR',
    DEACTIVATE_USER_REQUEST = 'DEACTIVATE_USER_REQUEST',
    DEACTIVATE_USER_SUCCESS = 'DEACTIVATE_USER_SUCCESS',
    DEACTIVATE_USER_ERROR = 'DEACTIVATE_USER_ERROR',
}

export type UserContextProps = {
    state: {
        user: FetchUser[];
    }
    isLoading?: boolean;
    isUserLoading?: boolean;
    error?: string;
    createUser: (user: UserTuple) => Promise<boolean>;
    getUser: (userId: number | undefined) => Promise<User | null>;
    getUsers: () => Promise<User[]>;
    deactivateUser: (userId: number | undefined) => Promise<boolean>;
    editUser: (userId: number, user: User) => Promise<boolean>;
}

export interface UserAction {
    type: UserActionType;
    payload?: any;
}