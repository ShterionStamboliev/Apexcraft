import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtons from '@/components/common/DialogElements/DialogTriggerButtons/DialogTriggerButtons';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import VatSelector from '@/components/common/FormElements/FormVatSelector';
import useSubmitHandler from '@/components/hooks/custom-hooks/useCreateEntitySubmitHandler';
import { useCompanyEntityHandlers } from '@/components/hooks/custom-hooks/useGenericEntityHandler';
import { formDefaultValues, newCompanySchema } from '@/components/models/company/newCompanySchema';
import { DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Company } from '@/types/company-types/companyTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { FormProvider, UseFormProps } from 'react-hook-form';

const CreateCompany = () => {
    const { role } = useAuth();
    const isManager = role === 'manager';

    const formOptions: Partial<UseFormProps<Company>> = {
        resolver: zodResolver(newCompanySchema),
        mode: 'onChange',
        defaultValues: formDefaultValues
    };

    const { handleCreateEntity, isLoading } = useCompanyEntityHandlers();
    const {
        onSubmit,
        isOpen,
        setIsOpen,
        form,
    } = useSubmitHandler<Company>(handleCreateEntity, formOptions);

    return (
        <>
            {isManager && (
                <FormProvider {...form}>
                    <form
                        id='company-form'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <Dialog
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >
                            <DialogTriggerButtons />

                            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                                <DialogHeader
                                    title='Add new company'
                                />

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
                                <div className='flex flex-1 pt-2 justify-between'>
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
                                    isLoading={isLoading}
                                    label='Submit'
                                    formName='company-form'
                                    className='mt-6'
                                />
                            </DialogContent>
                        </Dialog>
                    </form>
                </FormProvider>
            )}
        </>
    )
}

export default CreateCompany