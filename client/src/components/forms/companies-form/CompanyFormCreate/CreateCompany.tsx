import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import { CompanySchema } from '@/components/models/company/newCompanySchema';
import { DialogContent } from '@/components/ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import CreateCompanyForm from './CreateCompanyForm';
import useDialogState from '@/components/hooks/custom-hooks/useDialogState';
import { useMutationHook } from '@/components/hooks/custom-hooks/useMutationHook';

const CreateCompany = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();

    const { mutate, isPending } = useCreateNewEntity<CompanySchema>({
        URL: '/companies/create',
        queryKey: ['companies'],
        successToast: 'Company created successfully!',
        setIsOpen
    });

    const handleSubmit = (companyData: CompanySchema) => {
        mutate(companyData);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTriggerButtonCreate
                className='md:w-full lg:max-w-[12rem]'
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