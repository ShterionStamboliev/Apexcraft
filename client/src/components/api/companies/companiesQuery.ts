import useToastHook from '@/components/hooks/custom-hooks/useToastHook';
import useCompanyApi from './companiesApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CompanySchema } from '@/components/models/company/newCompanySchema';

type DialogStateAction = {
    companyId?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useCompaniesQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const { createCompany, editCompany } = useCompanyApi();

    const useCreateCompany = ({ setIsOpen }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (companyData: CompanySchema) => createCompany(companyData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['companies']
                });
                fireSuccessToast('Company created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    const useEditCompany = ({ setIsOpen, companyId }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (companyData: CompanySchema) => editCompany(companyId!, companyData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['companies']
                });
                fireSuccessToast('Company updated successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    return {
        useEditCompany,
        useCreateCompany
    }
};

export default useCompaniesQuery;