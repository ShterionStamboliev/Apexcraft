import { User } from './userTypes';

export enum UserActionType {
    CREATE_USER_REQUEST = 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
    CREATE_USER_ERROR = 'CREATE_USER_ERROR',
    USER_STATUS_REQUEST = 'USER_STATUS_REQUEST',
    USER_STATUS_SUCCESS = 'SER_STATUS_SUCCESS',
    USER_STATUS_ERROR = 'USER_STATUS_ERROR',
    EDIT_USER_REQUEST = 'EDIT_USER_REQUEST',
    EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS',
    EDIT_USER_ERROR = 'EDIT_USER_ERROR',
}

export type UserContextProps = {
    state: {
        user: User[];
    }
    isLoading?: boolean;
    error?: string;
    createUser: (user: User) => Promise<boolean>;
    changeUserStatus?: (userId: string) => Promise<boolean>;
    editUser?: (userId: string, user: User) => Promise<boolean>;
}

export interface UserAction {
    type: UserActionType;
    payload?: any;
}