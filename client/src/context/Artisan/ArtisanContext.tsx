import { createContext, useContext } from 'react'
import { EntityContextProps } from '../EntityReducers/entityReducers';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import useEntityApi from '@/components/api/entityApi';

const ArtisanContext = createContext<EntityContextProps<Artisan> | undefined>(undefined);

type ArtisanProviderType = {
    children: React.ReactNode
};

export const ArtisanProvider = ({ children }: ArtisanProviderType) => {
    const {
        state,
        createEntity,
        getEntity,
        getEntities,
        editEntity,
        deactivateEntity,
    } = useEntityApi<Artisan>('artisans');

    return (
        <ArtisanContext.Provider value={{
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
        </ArtisanContext.Provider>
    );
};

export const useArtisan = () => {
    const context = useContext(ArtisanContext);
    if (!context) {
        throw new Error('Artisan context must be used inside of a Provider component');
    };
    return context;
}