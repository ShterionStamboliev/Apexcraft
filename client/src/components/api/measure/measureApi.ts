import { useCallback, useReducer } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiCall } from '../apiCall';
import measureReducer, { initialState } from '@/context/Measure/measureReducer';
import { Measure } from '@/types/measure-types/measureTypes';
import { MeasureActionType } from '@/types/measure-types/measureActionTypes';

const useMeasureApi = () => {
    const [state, dispatch] = useReducer(measureReducer, initialState);

    const { token } = useAuth();

    const createMeasure = async (measureData: Measure): Promise<boolean> => {
        dispatch({
            type: MeasureActionType.CREATE_MEASURE_REQUEST
        });

        try {
            const newMeasureData: Measure = await apiCall('/measures/create', 'POST', token!, measureData);

            dispatch({
                type: MeasureActionType.CREATE_MEASURE_SUCCESS,
                payload: newMeasureData
            });

            await getMeasures();

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: MeasureActionType.CREATE_MEASURE_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const getMeasure = async (measureId: number | undefined): Promise<Measure | null> => {
        dispatch({
            type: MeasureActionType.GET_MEASURE_REQUEST,
        });

        try {
            const measure: Measure = await apiCall(`/measures/${measureId}`, 'GET', token!)

            dispatch({
                type: MeasureActionType.GET_MEASURE_SUCCESS,
                payload: measure,
            });

            return measure;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: MeasureActionType.GET_MEASURE_ERROR,
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
            type: MeasureActionType.GET_MEASURES_REQUEST,
        });

        try {
            const measures: Measure[] = await apiCall('/measures', 'GET', token!)

            dispatch({
                type: MeasureActionType.GET_MEASURES_SUCCESS,
                payload: measures,
            });

            return measures;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: MeasureActionType.GET_MEASURES_ERROR,
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
            type: MeasureActionType.EDIT_MEASURE_REQUEST,
        });

        try {
            await apiCall(`/users/${measureId}/edit`, 'PUT', token!, measureData);

            dispatch({
                type: MeasureActionType.EDIT_MEASURE_SUCCESS,
                payload: measureData,
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: MeasureActionType.EDIT_MEASURE_ERROR,
                    payload: {
                        error: error.message,
                    }
                });
            }
            return false;
        }
    };

    const deactivateMeasure = async (measureId: number | undefined): Promise<boolean> => {
        dispatch({
            type: MeasureActionType.DEACTIVATE_MEASURE_REQUEST,
        });

        try {
            const measure = await apiCall(`/measures/${measureId}/delete`, 'PUT', token!)

            dispatch({
                type: MeasureActionType.DEACTIVATE_MEASURE_SUCCESS,
                payload: measure
            });

            return true;
        } catch (error: unknown) {
            if (error instanceof Error) {
                dispatch({
                    type: MeasureActionType.DEACTIVATE_MEASURE_ERROR,
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