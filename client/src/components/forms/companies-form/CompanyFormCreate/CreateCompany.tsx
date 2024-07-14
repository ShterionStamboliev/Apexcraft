import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerDesktop from '@/components/common/DialogElements/DialogTriggerDesktop';
import DialogTriggerMobile from '@/components/common/DialogElements/DialogTriggerMobile';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import VatSelector from '@/components/common/FormElements/FormVatSelector';
import useCompanyEntityHandlers from '@/components/hooks/CompaniesHooks/useCompaniesEntityHook';
import useSubmitHandler from '@/components/hooks/custom-hooks/useCreateEntitySubmitHandler';
import { formDefaultValues, newCompanySchema } from '@/components/models/company/newCompanySchema';
import { DialogContent } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import { Company } from '@/types/company-types/companyTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { FormProvider, UseFormProps } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';

const CreateCompany = () => {
    const { role } = useAuth();
    const isManager = role === 'manager';

    const onDesktop = useMediaQuery('(min-width: 768px)');

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
                            {onDesktop
                                ? (
                                    <DialogTriggerDesktop />
                                )
                                : (
                                    <DialogTriggerMobile />
                                )
                            }

                            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                                <DialogHeader
                                    title='Add new company'
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
                                    />
                                    <VatSelector 
                                        label='DDS'
                                        name='company_dds'
                                        placeholder='no'
                                    />
                                </div>

                                <DialogFooter
                                    isLoading={isLoading}
                                    label='Submit'
                                    formName='company-form'
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