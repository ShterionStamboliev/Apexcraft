import { useAuth } from '@/context/AuthContext';
import activityReducer, { initialState } from '@/context/Activity/activityReducer';
import { useReducer } from 'react';
import { ActivityActionType } from '@/types/activity-types/activityActionTypes';
import { Activity } from '@/types/activity-types/activityTypes';

const API_URL = import.meta.env.VITE_API_URL;

const useActivityApi = () => {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    const { token } = useAuth();

    const createActivity = async (activityData: Activity): Promise<boolean> => {
        dispatch({
            type: ActivityActionType.CREATE_ACTIVITY_REQUEST,
        });

        try {
            const response = await fetch(`${API_URL}/activities/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(activityData)
            });

            if (!response.ok) {
                throw new Error('Грешка при създаване на дейност')
            }

            const newActivity: Activity = await response.json();

            dispatch({
                type: ActivityActionType.CREATE_ACTIVITY_SUCCESS,
                payload: newActivity,
            });

            // await getActivities();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ActivityActionType.CREATE_ACTIVITY_ERROR,
                    payload: {
                        error: error.message
                    }
                });
            };
            return false;
        }
    };

    const getActivity = async (activityId: string): Promise<Activity | null> => {
        dispatch({
            type: ActivityActionType.GET_ACTIVITY_REQUEST,
        });

        try {
            const response = await fetch(`${API_URL}/activities/${activityId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Грешка при зареждане на дейности')
            }

            const activityData: Activity = await response.json();

            dispatch({
                type: ActivityActionType.GET_ACTIVITY_SUCCESS,
                payload: activityData,
            });

            return activityData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ActivityActionType.GET_ACTIVITY_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return null;
        }
    };

    const getActivities = async (): Promise<Activity[]> => {
        dispatch({
            type: ActivityActionType.GET_ACTIVITIES_REQUEST,
        });

        try {
            const response = await fetch(`${API_URL}/activities`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Грешка при зареждане на дейности');
            }

            const activitiesData: Activity[] = await response.json();

            dispatch({
                type: ActivityActionType.GET_ACTIVITIES_SUCCESS,
                payload: activitiesData,
            });

            return activitiesData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ActivityActionType.GET_ACTIVITIES_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return [];
        }
    };

    const editActivity = async (activityId: string, activityData: Activity): Promise<boolean> => {
        dispatch({
            type: ActivityActionType.EDIT_ACTIVITY_REQUEST,
        });

        try {
            const response = await fetch(`${API_URL}/activities/${activityId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(activityData)
            });

            if (!response.ok) {
                throw new Error('Грешка при редактиране на дейност');
            }

            dispatch({
                type: ActivityActionType.EDIT_ACTIVITY_SUCCESS,
                payload: activityData,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ActivityActionType.EDIT_ACTIVITY_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const deactivateActivity = async (activityId: string): Promise<boolean> => {
        dispatch({
            type: ActivityActionType.DEACTIVATE_ACTIVITY_REQUEST,
        });

        try {
            const response = await fetch(`${API_URL}/activities/${activityId}/delete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Грешка при деактивиране на дейност')
            };

            const updatedActivity: Activity = await response.json();

            dispatch({
                type: ActivityActionType.DEACTIVATE_ACTIVITY_SUCCESS,
                payload: updatedActivity,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: ActivityActionType.EDIT_ACTIVITY_ERROR,
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