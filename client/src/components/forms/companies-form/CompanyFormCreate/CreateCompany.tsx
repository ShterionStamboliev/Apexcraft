import useCompaniesQuery from '@/components/api/companies/companiesQuery';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import { CompanySchema } from '@/components/models/company/newCompanySchema';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import CreateCompanyForm from './CreateCompanyForm';
import useDialogState from '@/components/hooks/custom-hooks/useDialogState';

const CreateCompany = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateCompany } = useCompaniesQuery();
    const { mutate, isPending } = useCreateCompany({ setIsOpen });

    const handleSubmit = (companyData: CompanySchema) => {
        mutate(companyData);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTriggerButtonCreate
                text='Add new company'
            />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                <DialogHeader title='Add new company' />
                <CreateCompanyForm
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateCompany