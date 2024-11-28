import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import useDialogState from '@/hooks/useDialogState';
import { useMutationHook } from '@/hooks/useMutationHook';
import {
    WorkItem,
    workItemSchema,
    WorkItemSchema,
} from '@/types/task-types/workItemType';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';
import UserWorkItemEditForm from './UserWorkItemEditForm';

type UserWorkItemEditProps = {
    taskId: string;
    workItemId?: string;
    workItem: WorkItem;
};

const UserWorkItemEdit = ({
    taskId,
    workItem,
    workItemId,
}: UserWorkItemEditProps) => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useEditEntity } = useMutationHook();

    const { mutate, isPending } = useEditEntity<WorkItemSchema>({
        URL: `/my-projects/${taskId}/task/${workItemId}/edit`,
        queryKey: ['artisanTasks', taskId],
        successToast: 'Work item updated successfully!',
        setIsOpen,
    });

    const handleSubmit = useSubmitHandler(mutate, workItemSchema);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonEdit />
            <DialogContent className='rounded-lg'>
                <DialogHeader className='items-center'>
                    <DialogTitle>Edit Work Item</DialogTitle>
                </DialogHeader>
                <UserWorkItemEditForm
                    workItem={workItem}
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};

export default UserWorkItemEdit;
