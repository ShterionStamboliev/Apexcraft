import useCompanyApi from '@/components/api/company/companyApi';
import { createContext, useContext } from 'react'
import { Company } from '@/types/company-types/companyTypes';
import { EntityContextProps } from '../EntityReducers/entityReducers';

const CompanyContext = createContext<EntityContextProps<Company> | undefined>(undefined);

type CompanyProviderType = {
    children: React.ReactNode
}

export const CompanyProvider = ({ children }: CompanyProviderType) => {
    const {
        state,
        createCompany,
        getCompany,
        getCompanies,
        editCompany,
        deactivateCompany,
    } = useCompanyApi();

    return (
        <CompanyContext.Provider value={{
            state,
            createEntity: createCompany,
            getEntity: getCompany,
            getEntities: getCompanies,
            editEntity: editCompany,
            deactivateEntity: deactivateCompany,
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