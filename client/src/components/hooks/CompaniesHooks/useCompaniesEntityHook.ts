import { useCompany } from '@/context/Company/CompanyContext';
import useEntityHandlers from '../custom-hooks/useEntityHandlers';
import { Company } from '@/types/company-types/companyTypes';

const useCompanyEntityHandlers = () => {
    const {
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    } = useCompany();

    return useEntityHandlers<Company>({
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    });
}

export default useCompanyEntityHandlers