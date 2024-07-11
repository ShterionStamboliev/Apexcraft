import { MeasureAction, MeasureActionType } from '@/types/measure-types/measureActionTypes';
import { Measure } from '@/types/measure-types/measureTypes';

interface InitialMeasureState {
    measure: Measure[];
    isLoading: boolean;
    isMeasureLoading: boolean;
    error?: string;
}

export const initialState: InitialMeasureState = {
    measure: [],
    isMeasureLoading: false,
    isLoading: false,
    error: undefined,
};

const measureReducer = (state: InitialMeasureState, action: MeasureAction) => {
    switch (action.type) {
        case MeasureActionType.CREATE_MEASURE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case MeasureActionType.CREATE_MEASURE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                measure: [...state.measure, action.payload],
            };
        case MeasureActionType.CREATE_MEASURE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case MeasureActionType.GET_MEASURE_REQUEST:
            return {
                ...state,
                isMeasureLoading: true,
                error: undefined,
            };
        case MeasureActionType.GET_MEASURE_SUCCESS:
            return {
                ...state,
                isMeasureLoading: false,
                measure: [...state.measure],
            };
        case MeasureActionType.EDIT_MEASURE_ERROR:
            return {
                ...state,
                isMeasureLoading: false,
                error: action.payload.error,
            };
        case MeasureActionType.GET_MEASURE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case MeasureActionType.GET_MEASURE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                measure: action.payload,
            };
        case MeasureActionType.GET_MEASURE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        case MeasureActionType.EDIT_MEASURE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case MeasureActionType.EDIT_MEASURE_SUCCESS:
            return {
                ...state,
                isMeasureLoading: false,
                measure: state.measure.map(measure =>
                    measure.id === action.payload.id
                        ? action.payload
                        : measure
                )
            };
        case MeasureActionType.EDIT_MEASURE_ERROR:
            return {
                ...state,
                isMeasureLoading: false,
                error: action.payload.error,
            };
        case MeasureActionType.DEACTIVATE_MEASURE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case MeasureActionType.DEACTIVATE_MEASURE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                measure: state.measure.map(measure =>
                    measure.id === action.payload.id
                        ? { ...measure, status: 'inactive' }
                        : measure
                )
            };
        case MeasureActionType.DEACTIVATE_MEASURE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default measureReducer;