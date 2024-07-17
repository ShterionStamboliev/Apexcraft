import { useAuth } from '@/context/AuthContext';
import { EntityActionType } from '@/context/EntityReducers/entityActionTypes';
import entityReducer, { initialState } from '@/context/EntityReducers/entityReducers'
import { Artisan } from '@/types/artisan-types/artisanTypes'
import { useCallback, useReducer } from 'react';
import { apiCall } from '../apiCall';

const useArtisanApi = () => {
    const artisansInitialState = initialState<Artisan>();

    const [state, dispatch] = useReducer(entityReducer<Artisan>, artisansInitialState);

    const { token } = useAuth();

    const createArtisan = async (artisanData: Artisan): Promise<boolean> => {
        dispatch({
            type: EntityActionType.CREATE_REQUEST,
        });

        try {
            const newArtisanData: Artisan = await apiCall('/artisans/create', 'POST', token!, artisanData);

            dispatch({
                type: EntityActionType.CREATE_SUCCESS,
                payload: newArtisanData,
            });

            await getArtisans();

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

    const getArtisan = async (artisanId: number): Promise<Artisan | null> => {
        dispatch({
            type: EntityActionType.GET_REQUEST,
        });

        try {
            const artisan: Artisan = await apiCall(`/artisans/${artisanId}`, 'GET', token!);

            console.log(artisan);
            dispatch({
                type: EntityActionType.GET_SUCCESS,
                payload: artisan,
            });

            return artisan;
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

    const getArtisans = useCallback(async (): Promise<Artisan[]> => {
        dispatch({
            type: EntityActionType.GET_ALL_REQUEST,
        });

        try {
            const artisans: Artisan[] = await apiCall('/artisans', 'GET', token!);

            dispatch({
                type: EntityActionType.GET_ALL_SUCCESS,
                payload: artisans,
            });

            return artisans;
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

    const editArtisan = async (artisanId: number, artisanData: Artisan): Promise<boolean> => {
        dispatch({
            type: EntityActionType.EDIT_REQUEST,
        });

        try {
            await apiCall(`/artisans/${artisanId}/edit`, 'PUT', token!, artisanData);

            dispatch({
                type: EntityActionType.EDIT_SUCCESS,
                payload: artisanData,
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

    const deactivateArtisan = async (artisanId: number): Promise<boolean> => {
        dispatch({
            type: EntityActionType.DEACTIVATE_REQUEST,
        });

        try {
            const artisan = await apiCall(`/artisans/${artisanId}/delete`, 'PUT', token!);

            dispatch({
                type: EntityActionType.DEACTIVATE_SUCCESS,
                payload: artisan,
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
        createArtisan,
        getArtisan,
        getArtisans,
        editArtisan,
        deactivateArtisan
    };
};

export default useArtisanApi;