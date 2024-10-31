import useActivitiesQuery from '@/components/api/activities/activitiesQuery';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import { ActivitySchema } from '@/components/models/activity/newActivitySchema';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CreateActivityForm from './CreateActivityForm';
import useDialogState from '@/components/hooks/custom-hooks/useDialogState';

const CreateActivity = () => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateActivity } = useActivitiesQuery();
    const { mutate, isPending } = useCreateActivity({ setIsOpen });

    const handleSubmit = async (activityData: ActivitySchema) => {
        mutate(activityData);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <DialogTriggerButtonCreate
                text='Add new activity'
            />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px] gap-0'>
                <DialogHeader
                    title='Add new activity'
                />
                <CreateActivityForm
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateActivity