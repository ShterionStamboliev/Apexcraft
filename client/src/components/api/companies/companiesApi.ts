import { apiCall } from '../apiCall';
import { Company } from '@/types/company-types/companyTypes';

const useCompanyApi = () => {
    const createCompany = async (companyData: Company): Promise<Company> => {
        const data: Company = await apiCall('/companies/create', 'POST', companyData);
        return data;
    };

    const getCompanies = async (): Promise<Company[]> => {
        const data: Company[] = await apiCall('/companies', 'GET');
        return data;
    };

    const editCompany = async (companyId: string, companyData: Company): Promise<void> => {
        return await apiCall(`/companies/${companyId}/edit`, 'PUT', companyData);
    };

    return {
        getCompanies,
        createCompany,
        editCompany
    }
}

export default useCompanyApi;