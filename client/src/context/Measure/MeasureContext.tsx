import { createContext, useContext } from 'react'
import useMeasureApi from '@/components/api/measure/measureApi';
import { Measure } from '@/types/measure-types/measureTypes';
import { EntityContextProps } from '../EntityReducers/entityReducers';

const MeasureContext = createContext<EntityContextProps<Measure> | undefined>(undefined);

type MeasureProviderType = {
    children: React.ReactNode
};

export const MeasureProvider = ({ children }: MeasureProviderType) => {
    const {
        state,
        createMeasure,
        getMeasure,
        getMeasures,
        editMeasure,
        deactivateMeasure,
    } = useMeasureApi();

    return (
        <MeasureContext.Provider value={{
            state,
            createEntity: createMeasure,
            getEntity: getMeasure,
            getEntities: getMeasures,
            editEntity: editMeasure,
            deactivateEntity: deactivateMeasure,
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