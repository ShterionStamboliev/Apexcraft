import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import VatSelector from '@/components/common/FormElements/FormVatSelector';
import { companySchema, CompanySchema } from '@/models/company/companySchema';
import { Company } from '@/types/company-types/companyTypes';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit';
import useDialogState from '@/hooks/useDialogState';
import {
    ClipboardList,
    FileDigit,
    Mail,
    MapPin,
    Phone,
    User,
} from 'lucide-react';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';
import { useMutationHook } from '@/hooks/useMutationHook';
import { useCompanyFormHooks } from '@/hooks/forms/useCompanyForm';

type CompanyFormProps = {
    companyId: string;
    company: Company;
};

const EditCompanyForm = ({ company, companyId }: CompanyFormProps) => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useEditEntity } = useMutationHook();
    const { mutate, isPending } = useEditEntity<CompanySchema>({
        URL: `/companies/${companyId}/edit`,
        queryKey: ['companies'],
        successToast: 'Company updated successfully!',
        setIsOpen,
    });

    const { useEditCompanyForm } = useCompanyFormHooks();
    const form = useEditCompanyForm(company);

    const handleSubmit = useSubmitHandler(mutate, companySchema);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonEdit />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                <DialogHeader title='Edit company' />
                <FormProvider {...form}>
                    <form
                        id='form-edit'
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <FormFieldInput
                            type='text'
                            label='Company name'
                            name='name'
                            className='pl-10'
                            Icon={ClipboardList}
                        />
                        <FormFieldInput
                            type='text'
                            label='Company number'
                            name='number'
                            className='pl-10'
                            Icon={FileDigit}
                        />
                        <FormFieldInput
                            type='text'
                            label='Company address'
                            name='address'
                            className='pl-10'
                            Icon={MapPin}
                        />
                        <FormFieldInput
                            type='text'
                            label='Company MOL'
                            name='mol'
                            className='pl-10'
                            Icon={User}
                        />
                        <FormFieldInput
                            type='email'
                            label='Company email'
                            name='email'
                            className='pl-10'
                            Icon={Mail}
                        />
                        <FormFieldInput
                            type='text'
                            label='Company phone'
                            name='phone'
                            className='pl-10'
                            Icon={Phone}
                        />
                        <div className='flex flex-wrap gap-1 flex-1 pt-2 justify-between'>
                            <StatusSelector
                                label='Status'
                                name='status'
                                placeholder='active'
                                defaultVal={company && company.status}
                            />
                            <VatSelector
                                label='DDS'
                                name='dds'
                                placeholder=''
                                defaultVal={company && company.dds}
                            />
                        </div>
                        <DialogFooter
                            disabled={!form.formState.isDirty || isPending}
                            label='Submit'
                            formName='form-edit'
                            className='mt-6'
                        />
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default EditCompanyForm;
