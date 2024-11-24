import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import useDialogState from '@/components/hooks/custom-hooks/useDialogState';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { WorkItemSchema } from '@/types/task-types/workItemType';
import { useParams } from 'react-router-dom';
import UserWorkItemCreateForm from './UserWorkItemCreateForm';
import { useMutationHook } from '@/components/hooks/custom-hooks/useMutationHook';

const UserWorkItemCreate = () => {
    const { taskId } = useParams();

    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();

    const { mutate, isPending } = useCreateNewEntity<WorkItemSchema>({
        URL: `/my-projects/${taskId}/task/create`,
        queryKey: ['artisanTasks', taskId],
        successToast: 'Work item created successfully!',
        setIsOpen,
    });

    const handleSubmit = (workItemData: WorkItemSchema) => {
        mutate(workItemData);
    };

    return (
        <div className='mb-6'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTriggerButtonCreate text='Add new work item' />
                <DialogContent className='rounded-lg sm:max-w-[30rem]'>
                    <DialogHeader>
                        <DialogTitle className='text-center'>
                            Add new work item
                        </DialogTitle>
                    </DialogHeader>
                    <UserWorkItemCreateForm
                        handleSubmit={handleSubmit}
                        isPending={isPending}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserWorkItemCreate;
