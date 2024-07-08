import { createContext, useContext } from 'react'
import { MeasureContextProps } from '@/types/measure-types/measureActionTypes';
import useMeasureApi from '@/components/api/measure/measureApi';

const MeasureContext = createContext<MeasureContextProps | undefined>(undefined);

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
            createMeasure,
            getMeasure,
            getMeasures,
            editMeasure,
            deactivateMeasure,
            isLoading: state.isLoading || false,
            isMeasureLoading: state.isMeasureLoading || false,
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