import { Activity } from './activityTypes';

export enum ActivityActionType {
    CREATE_ACTIVITY_REQUEST = 'CREATE_ACTIVITY_REQUEST',
    CREATE_ACTIVITY_SUCCESS = 'CREATE_ACTIVITY_SUCCESS',
    CREATE_ACTIVITY_ERROR = 'CREATE_ACTIVITY_ERROR',
    GET_ACTIVITY_REQUEST = 'GET_ACTIVITY_REQUEST',
    GET_ACTIVITY_SUCCESS = 'GET_ACTIVITY_SUCCESS',
    GET_ACTIVITY_ERROR = 'GET_ACTIVITY_ERROR',
    GET_ACTIVITIES_REQUEST = 'GET_ACTIVITIES_REQUEST',
    GET_ACTIVITIES_SUCCESS = 'GET_ACTIVITIES_SUCCESS',
    GET_ACTIVITIES_ERROR = 'GET_ACTIVITIES_ERROR',
    EDIT_ACTIVITY_REQUEST = 'EDIT_ACTIVITY_REQUEST',
    EDIT_ACTIVITY_SUCCESS = 'EDIT_ACTIVITY_SUCCESS',
    EDIT_ACTIVITY_ERROR = 'EDIT_ACTIVITY_ERROR',
    DEACTIVATE_ACTIVITY_REQUEST = 'DEACTIVATE_ACTIVITY_REQUEST',
    DEACTIVATE_ACTIVITY_SUCCESS = 'DEACTIVATE_ACTIVITY_SUCCESS',
    DEACTIVATE_ACTIVITY_ERROR = 'DEACTIVATE_ACTIVITY_ERROR',
}

export type ActivityContextProps = {
    state: {
        activity: Activity[];
    }
    isLoading?: boolean;
    isActivityLoading?: boolean;
    error?: string;
    createActivity: (activity: Activity) => Promise<boolean>;
    getActivity: (activityId: number | undefined) => Promise<Activity | null>;
    getActivities: () => Promise<Activity[]>;
    editActivity: (activityId: number, activity: Activity) => Promise<boolean>;
    deactivateActivity: (activityId: number | undefined) => Promise<boolean>;
}

export interface ActivityAction {
    type: ActivityActionType;
    payload?: any;
}