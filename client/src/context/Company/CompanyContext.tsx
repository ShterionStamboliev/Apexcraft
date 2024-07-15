import useCompanyApi from '@/components/api/company/companyApi';
import { CompanyContextProps } from '@/types/company-types/companyActionTypes'
import { createContext, useContext } from 'react'

const CompanyContext = createContext<CompanyContextProps | undefined>(undefined);

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
            createCompany,
            getCompany,
            getCompanies,
            editCompany,
            deactivateCompany,
            isLoading: state.isLoading || false,
            isCompanyLoading: state.isCompanyLoading || false,
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