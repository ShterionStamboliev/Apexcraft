import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import { ActivitySchema } from '@/models/activity/newActivitySchema';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CreateActivityForm from './CreateActivityForm';
import useDialogState from '@/hooks/custom-hooks/useDialogState';
import { useMutationHook } from '@/hooks/custom-hooks/useMutationHook';

const CreateActivity = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();

    const { mutate, isPending } = useCreateNewEntity<ActivitySchema>({
        URL: '/activities/create',
        queryKey: ['activities'],
        successToast: 'Activity created successfully!',
        setIsOpen,
    });

    const handleSubmit = (activityData: ActivitySchema) => {
        mutate(activityData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonCreate
                className='md:w-full lg:max-w-[12rem]'
                text='Add new activity'
            />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                <DialogHeader title='Add new activity' />
                <CreateActivityForm
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CreateActivity;