import { Company } from '@/types/company-types/companyTypes';
import { useCompany } from '@/context/Company/CompanyContext';
import { newCompanySchema } from '@/components/models/company/newCompanySchema';
import useEditEntity from '../custom-hooks/useEditEntityHandler';

const useEditCompany = (company: Company, onSuccess?: () => void) => {
    return useEditEntity<Company>({
        entity: company,
        initialFormState: { ...company },
        schema: newCompanySchema,
        useEntityContext: useCompany,
        onSuccess,
    });
};

export default useEditCompany;