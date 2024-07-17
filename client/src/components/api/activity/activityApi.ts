import { useAuth } from '@/context/AuthContext';
import { useCallback, useReducer } from 'react';
import { Activity } from '@/types/activity-types/activityTypes';
import { apiCall } from '../apiCall';
import entityReducer, { initialState } from '@/context/EntityReducers/entityReducers';
import { EntityActionType } from '@/context/EntityReducers/entityActionTypes';

const useActivityApi = () => {
    const activityInitialState = initialState<Activity>();

    const [state, dispatch] = useReducer(entityReducer<Activity>, activityInitialState);

    const { token } = useAuth();

    const createActivity = async (activityData: Activity): Promise<boolean> => {
        dispatch({
            type: EntityActionType.CREATE_REQUEST,
        });

        try {
            const newActivityData: Activity = await apiCall('/activities/create', 'POST', token!, activityData);

            dispatch({
                type: EntityActionType.CREATE_SUCCESS,
                payload: newActivityData,
            });

            await getActivities();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.CREATE_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            };
            return false;
        }
    };

    const getActivity = async (activityId: number): Promise<Activity | null> => {
        dispatch({
            type: EntityActionType.GET_REQUEST,
        });

        try {
            const activity: Activity = await apiCall(`/activities/${activityId}`, 'GET', token!);
            
            console.log(activity);
            dispatch({
                type: EntityActionType.GET_SUCCESS,
                payload: activity,
            });
            
            return activity;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.GET_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return null;
        }
    };

    const getActivities = useCallback(async (): Promise<Activity[]> => {
        dispatch({
            type: EntityActionType.GET_ALL_REQUEST,
        });

        try {
            const activities: Activity[] = await apiCall('/activities', 'GET', token!);

            dispatch({
                type: EntityActionType.GET_ALL_SUCCESS,
                payload: activities,
            });

            return activities;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.GET_ALL_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return [];
        }
    }, [token]);

    const editActivity = async (activityId: number, activityData: Activity): Promise<boolean> => {
        dispatch({
            type: EntityActionType.EDIT_REQUEST,
        });

        try {
            await apiCall(`/activities/${activityId}/edit`, 'PUT', token!, activityData);

            dispatch({
                type: EntityActionType.EDIT_SUCCESS,
                payload: activityData,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.EDIT_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const deactivateActivity = async (activityId: number): Promise<boolean> => {
        dispatch({
            type: EntityActionType.DEACTIVATE_REQUEST,
        });

        try {
            const activity = await apiCall(`/activities/${activityId}/delete`, 'PUT', token!);

            dispatch({
                type: EntityActionType.DEACTIVATE_SUCCESS,
                payload: activity,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.DEACTIVATE_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            }
            return false;
        }
    };

    return {
        state,
        createActivity,
        getActivity,
        getActivities,
        editActivity,
        deactivateActivity,
    };
};

export default useActivityApi;