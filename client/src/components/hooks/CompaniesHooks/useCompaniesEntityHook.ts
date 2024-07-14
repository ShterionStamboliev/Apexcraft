import { useCompany } from '@/context/Companies/CompanyContext';
import useEntityHandlers from '../custom-hooks/useEntityHandlers';
import { Company } from '@/types/company-types/companyTypes';

const useCompanyEntityHandlers = () => {
    const {
        createCompany,
        getCompany,
        getCompanies,
        deactivateCompany,
        isLoading,
    } = useCompany();

    return useEntityHandlers<Company>({
        createEntity: createCompany,
        getEntity: getCompany,
        getEntities: getCompanies,
        deactivateEntity: deactivateCompany,
        isLoading,
    });
}

export default useCompanyEntityHandlers