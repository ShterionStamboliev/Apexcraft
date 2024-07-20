import { createContext, useContext } from 'react'
import { Measure } from '@/types/measure-types/measureTypes';
import { EntityContextProps } from '../EntityReducers/entityReducers';
import useEntityApi from '@/components/api/entityApi';

const MeasureContext = createContext<EntityContextProps<Measure> | undefined>(undefined);

type MeasureProviderType = {
    children: React.ReactNode
};

export const MeasureProvider = ({ children }: MeasureProviderType) => {
    const {
        state,
        createEntity,
        getEntity,
        getEntities,
        editEntity,
        deactivateEntity,
    } = useEntityApi<Measure>('measures');

    return (
        <MeasureContext.Provider value={{
            state,
            createEntity,
            getEntity,
            getEntities,
            editEntity,
            deactivateEntity,
            isLoading: state.isLoading || false,
            isEntityLoading: state.isEntityLoading || false,
        }}>
            {children}
        </MeasureContext.Provider>
    );
};

export const useMeasure = () => {
    const context = useContext(MeasureContext);
    if (!context) {
        throw new Error('Measure context must be used inside of a Provider component');
    };
    return context;
}