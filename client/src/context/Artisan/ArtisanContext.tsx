import { createContext, useContext } from 'react'
import { EntityContextProps } from '../EntityReducers/entityReducers';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import useArtisanApi from '@/components/api/artisans/artisanApi';

const ArtisanContext = createContext<EntityContextProps<Artisan> | undefined>(undefined);

type ArtisanProviderType = {
    children: React.ReactNode
};

export const ArtisanProvider = ({ children }: ArtisanProviderType) => {
    const {
        state,
        createArtisan,
        getArtisan,
        getArtisans,
        editArtisan,
        deactivateArtisan,
    } = useArtisanApi();

    return (
        <ArtisanContext.Provider value={{
            state,
            createEntity: createArtisan,
            getEntity: getArtisan,
            getEntities: getArtisans,
            editEntity: editArtisan,
            deactivateEntity: deactivateArtisan,
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