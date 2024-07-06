import { Measure } from './measureTypes';

export enum MeasureActionType {
    CREATE_MEASURE_REQUEST = 'CREATE_MEASURE_REQUEST',
    CREATE_MEASURE_SUCCESS = 'CREATE_MEASURE_SUCCESS',
    CREATE_MEASURE_ERROR = 'CREATE_MEASURE_ERROR',
    GET_MEASURE_REQUEST = 'GET_MEASURE_REQUEST',
    GET_MEASURE_SUCCESS = 'GET_MEASURE_SUCCESS',
    GET_MEASURE_ERROR = 'GET_MEASURE_ERROR',
    GET_MEASURES_REQUEST = 'GET_MEASURES_REQUEST',
    GET_MEASURES_SUCCESS = 'GET_MEASURES_SUCCESS',
    GET_MEASURES_ERROR = 'GET_MEASURES_ERROR',
    EDIT_MEASURE_REQUEST = 'EDIT_MEASURE_REQUEST',
    EDIT_MEASURE_SUCCESS = 'EDIT_MEASURE_SUCCESS',
    EDIT_MEASURE_ERROR = 'EDIT_MEASURE_ERROR',
    DEACTIVATE_MEASURE_REQUEST = 'DEACTIVATE_MEASURE_REQUEST',
    DEACTIVATE_MEASURE_SUCCESS = 'DEACTIVATE_MEASURE_SUCCESS',
    DEACTIVATE_MEASURE_ERROR = 'DEACTIVATE_MEASURE_ERROR',
}

export type MeasureContextProps = {
    state: {
        measure: Measure[];
    }
    isLoading?: boolean;
    isMeasureLoading?: boolean;
    error?: string;
    createMeasure: (measure: Measure) => Promise<boolean>;
    getMeasure: (measureId: number | undefined) => Promise<Measure | null>;
    getMeasures: () => Promise<Measure[]>;
    editMeasure: (measureId: number, measure: Measure) => Promise<boolean>;
    deactivateMeasure: (measureId: number | undefined) => Promise<boolean>;
}

export interface MeasureAction {
    type: MeasureActionType;
    payload?: any;
}