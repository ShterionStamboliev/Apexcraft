import { EntityActionType, EntityAction } from './entityActionTypes';

export type EntityContextProps<T> = {
    state: {
        data: T[];
    }
    isLoading?: boolean;
    isEntityLoading?: boolean;
    error?: string;
    createEntity: (entity: T) => Promise<boolean>;
    getEntity: (entityId: number) => Promise<T | null>;
    getEntities: () => Promise<T[]>;
    editEntity: (entityId: number, entity: T) => Promise<boolean>;
    deactivateEntity: (entityId: number) => Promise<boolean>;
};

interface InitialEntityState<T> {
    data: T[];
    isLoading: boolean;
    isEntityLoading: boolean;
    error?: string;
}

export const initialState = <T>(): InitialEntityState<T> => ({
    data: [],
    isEntityLoading: false,
    isLoading: false,
    error: undefined,
});

const entityReducer = <T>(state: InitialEntityState<T>, action: EntityAction<T>) => {
    switch (action.type) {
        case EntityActionType.CREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case EntityActionType.CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: [...state.data, action.payload as T],
            };
        case EntityActionType.CREATE_ERROR:
            return {
                ...state,
                isEntityLoading: false,
                error: (action.payload as { error: string }).error,
            };
        case EntityActionType.GET_REQUEST:
            return {
                ...state,
                isEntityLoading: true,
                error: undefined,
            };
        case EntityActionType.GET_SUCCESS:
            return {
                ...state,
                isEntityLoading: false,
                entity: [...state.data, action.payload as T],
            };
        case EntityActionType.GET_ERROR:
            return {
                ...state,
                isEntityLoading: false,
                error: (action.payload as { error: string; }).error,
            };
        case EntityActionType.GET_ALL_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case EntityActionType.GET_ALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload as T[],
            };
        case EntityActionType.GET_ALL_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action.payload as { error: string; }).error,
            };
        case EntityActionType.EDIT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined,
            };
        case EntityActionType.EDIT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: state.data.map(entity =>
                    (entity as any).id === (action.payload as T & { id: number }).id
                        ? action.payload as T
                        : entity
                )
            };
        case EntityActionType.EDIT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action.payload as { error: string }).error,
            };
        case EntityActionType.DEACTIVATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        case EntityActionType.DEACTIVATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: state.data.map(entity =>
                    (entity as any).id === (action.payload as T & { id: number }).id
                        ? { ...entity, status: 'inactive' }
                        : entity
                )
            };
        case EntityActionType.DEACTIVATE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: (action.payload as { error: string }).error
            }
        default:
            return state;
    }
}

export default entityReducer;