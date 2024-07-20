import { createContext, useContext } from 'react'
import { Company } from '@/types/company-types/companyTypes';
import { EntityContextProps } from '../EntityReducers/entityReducers';
import useEntityApi from '@/components/api/entityApi';

const CompanyContext = createContext<EntityContextProps<Company> | undefined>(undefined);

type CompanyProviderType = {
    children: React.ReactNode
}

export const CompanyProvider = ({ children }: CompanyProviderType) => {
    const {
        state,
        createEntity,
        getEntity,
        getEntities,
        editEntity,
        deactivateEntity,
    } = useEntityApi<Company>('companies');

    return (
        <CompanyContext.Provider value={{
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
        </CompanyContext.Provider>
    );
};

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('Company context must be used within a provider component');
    };
    return context;
}