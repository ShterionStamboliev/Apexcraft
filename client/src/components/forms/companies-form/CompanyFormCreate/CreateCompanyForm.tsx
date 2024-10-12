import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import VatSelector from '@/components/common/FormElements/FormVatSelector';
import { companyDefaults, CompanySchema, newCompanySchema } from '@/components/models/company/newCompanySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

type CreateCompanyFormProps = {
    handleSubmit: (companyData: CompanySchema) => void;
    isPending: boolean;
}

const CreateCompanyForm = ({ handleSubmit, isPending }: CreateCompanyFormProps) => {
    const form = useForm<CompanySchema>({
        resolver: zodResolver(newCompanySchema),
        defaultValues: companyDefaults,
        mode: 'onChange'
    });

    return (
        <FormProvider {...form}>
            <form
                id='company-form'
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <FormFieldInput
                    type='text'
                    label='Company name'
                    name='name'
                />
                <FormFieldInput
                    type='text'
                    label='Company number'
                    name='number'
                />
                <FormFieldInput
                    type='text'
                    label='Company address'
                    name='address'
                />
                <FormFieldInput
                    type='text'
                    label='Company MOL'
                    name='mol'
                />
                <FormFieldInput
                    type='email'
                    label='Company email'
                    name='email'
                />
                <FormFieldInput
                    type='text'
                    label='Company phone'
                    name='phone'
                />
                <div className='flex flex-wrap gap-1 flex-1 pt-2 justify-between'>
                    <StatusSelector
                        label='Status'
                        name='status'
                        placeholder='active'
                    />
                    <VatSelector
                        label='DDS'
                        name='dds'
                        placeholder='no'
                    />
                </div>
                <DialogFooter
                    disabled={!form.formState.isDirty || isPending}
                    label='Submit'
                    formName='company-form'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    )
}

export default CreateCompanyForm