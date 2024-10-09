import useCompaniesQuery from '@/components/api/companies/companiesQuery';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import VatSelector from '@/components/common/FormElements/FormVatSelector';
import { companyDefaults, CompanySchema, newCompanySchema } from '@/components/models/company/newCompanySchema';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateCompany = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useCreateCompany } = useCompaniesQuery();
    const { mutate, isPending } = useCreateCompany({ setIsOpen });

    const form = useForm<CompanySchema>({
        resolver: zodResolver(newCompanySchema),
        defaultValues: companyDefaults,
        mode: 'onChange'
    });

    const handleSubmit = (companyData: CompanySchema) => {
        mutate(companyData, {
            onSuccess: () => {
                form.reset();
            }
        });
    };

    return (
        <div className='mb-4'>
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTrigger asChild>
                    <Button className='w-full md:max-w-[12rem]' variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        <span className='font-bold'>Add new company</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                    <DialogHeader title='Add new company' />
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
                </DialogContent>
            </Dialog >
        </div >
    )
}

export default CreateCompany