
import { FormProvider, useForm } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import VatSelector from '@/components/common/FormElements/FormVatSelector';
import { useState } from 'react';
import useCompaniesQuery from '@/components/api/companies/companiesQuery';
import { CompanySchema, newCompanySchema } from '@/components/models/company/newCompanySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company } from '@/types/company-types/companyTypes';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

type CompanyFormProps = {
    companyId: string;
    company: Company;
}

const EditCompanyForm = ({ company, companyId }: CompanyFormProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { useEditCompany } = useCompaniesQuery();
    const { mutate, isPending } = useEditCompany({ companyId, setIsOpen });

    const form = useForm<CompanySchema>({
        resolver: zodResolver(newCompanySchema),
        defaultValues: {
            name: company.name,
            address: company.address,
            dds: company.dds,
            email: company.email,
            mol: company.mol,
            number: company.number,
            phone: company.phone,
            status: company.status
        },
        mode: 'onChange'
    });

    const handleSubmit = (companyData: CompanySchema) => {
        mutate(companyData);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <Edit />
                </Button>
            </DialogTrigger>
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
    )
}

export default EditCompanyForm