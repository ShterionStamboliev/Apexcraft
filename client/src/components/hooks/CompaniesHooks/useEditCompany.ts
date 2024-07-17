import useToastHook from '../custom-hooks/useToastHook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company } from '@/types/company-types/companyTypes';
import { useCompany } from '@/context/Company/CompanyContext';
import { newCompanySchema } from '@/components/models/company/newCompanySchema';

const useEditCompany = (company: Company, onSuccess?: () => void) => {
    const { editEntity, isLoading } = useCompany();
    const { fireToast } = useToastHook();

    const form = useForm<Company>({
        defaultValues: company && {
            ...company,
        },
        resolver: zodResolver(newCompanySchema)
    });

    const { reset } = form;

    const onSubmit = async (data: Company) => {
        try {
            if (company?.id) {
                const isEditSuccess = await editEntity(company.id, data);
                if (isEditSuccess && onSuccess) {
                    onSuccess();
                    reset();
                    fireToast({
                        title: 'Edit successful',
                        variant: 'success',
                    });
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                fireToast({
                    title: error.message,
                    variant: 'destructive',
                });
            }
        }
    };

    return {
        form,
        isLoading,
        onSubmit
    };
};

export default useEditCompany;