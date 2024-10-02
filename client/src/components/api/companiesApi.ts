import { apiCall } from './apiCall';
import { Company } from '@/types/company-types/companyTypes';

const useCompanyApi = () => {
    const getCompanies = async (): Promise<Company[]> => {
        const data: Company[] = await apiCall('/companies', 'GET');
        return data;
    };

    return {
        getCompanies,
    }
}

export default useCompanyApi;