import { useCallback, useReducer } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiCall } from '../apiCall';
import { Measure } from '@/types/measure-types/measureTypes';
import entityReducer, { initialState } from '@/context/EntityReducers/entityReducers';
import { EntityActionType } from '@/context/EntityReducers/entityActionTypes';

const useMeasureApi = () => {
    const measuresInitialState = initialState<Measure>();
    
    const [state, dispatch] = useReducer(entityReducer<Measure>, measuresInitialState);

    const { token } = useAuth();

    const createMeasure = async (measureData: Measure): Promise<boolean> => {
        dispatch({
            type: EntityActionType.CREATE_REQUEST
        });

        try {
            const newMeasureData: Measure = await apiCall('/measures/create', 'POST', token!, measureData);

            dispatch({
                type: EntityActionType.CREATE_SUCCESS,
                payload: newMeasureData
            });

            await getMeasures();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: EntityActionType.CREATE_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const getMeasure = async (measureId: number): Promise<Measure | null> => {
        dispatch({
            type: EntityActionType.GET_REQUEST,
        });

        try {
            const measure: Measure = await apiCall(`/measures/${measureId}`, 'GET', token!)

            dispatch({
                type: EntityActionType.GET_SUCCESS,
                payload: measure,
            });

            return measure;
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

    const getMeasures = useCallback(async (): Promise<Measure[]> => {
        dispatch({
            type: EntityActionType.GET_ALL_REQUEST,
        });

        try {
            const measures: Measure[] = await apiCall('/measures', 'GET', token!)

            dispatch({
                type: EntityActionType.GET_ALL_SUCCESS,
                payload: measures,
            });

            return measures;
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

    const editMeasure = async (measureId: number, measureData: Measure): Promise<boolean> => {
        dispatch({
            type: EntityActionType.EDIT_REQUEST,
        });

        try {
            await apiCall(`/measures/${measureId}/edit`, 'PUT', token!, measureData);

            dispatch({
                type: EntityActionType.EDIT_SUCCESS,
                payload: measureData,
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

    const deactivateMeasure = async (measureId: number): Promise<boolean> => {
        dispatch({
            type: EntityActionType.DEACTIVATE_REQUEST,
        });

        try {
            const measure = await apiCall(`/measures/${measureId}/delete`, 'PUT', token!)

            dispatch({
                type: EntityActionType.DEACTIVATE_SUCCESS,
                payload: measure
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
        createMeasure,
        getMeasure,
        getMeasures,
        editMeasure,
        deactivateMeasure
    };
};

export default useMeasureApi;