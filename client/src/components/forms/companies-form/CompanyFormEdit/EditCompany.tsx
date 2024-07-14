
import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import { CompanyFormProps } from '@/types/company-types/companyTypes';
import useEditCompany from '@/components/hooks/CompaniesHooks/useEditCompany';
import VatSelector from '@/components/common/FormElements/FormVatSelector';

const EditForm = ({ company, onSuccess }: CompanyFormProps) => {
    const { form, isLoading, onSubmit } = useEditCompany(company, onSuccess);

    return (
        <FormProvider {...form}>
            <form
                id='form-edit'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <DialogHeader
                    title='Edit company'
                    user={`${company?.company_name}`}
                />
                <FormFieldInput
                    type='text'
                    label='Company name'
                    name='company_name'
                />

                <FormFieldInput
                    type='text'
                    label='Company number'
                    name='company_number'
                />

                <FormFieldInput
                    type='text'
                    label='Company address'
                    name='company_address'
                />

                <FormFieldInput
                    type='text'
                    label='Company MOL'
                    name='company_mol'
                />

                <FormFieldInput
                    type='email'
                    label='Company email'
                    name='company_email'
                />

                <FormFieldInput
                    type='text'
                    label='Company phone'
                    name='company_phone'
                />
                <div className='flex flex-1 justify-between'>
                    <StatusSelector
                        label='Status'
                        name='status'
                        placeholder='active'
                        defaultVal={company && company.status}
                    />
                    <VatSelector
                        label='DDS'
                        name='company_dds'
                        placeholder=''
                        defaultVal={company && company.company_dds}
                    />
                </div>
                <DialogFooter
                    isLoading={isLoading}
                    label='Редактирайте'
                    formName='form-edit'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default EditForm