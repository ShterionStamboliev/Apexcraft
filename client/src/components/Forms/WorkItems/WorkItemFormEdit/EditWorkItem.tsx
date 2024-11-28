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
    WorkItemSchema,
    workItemSchema,
} from '@/types/task-types/workItemType';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';
import EditWorkItemForm from './EditWorkItemForm';

type EditWorkItemProps = {
    id: string;
    taskId: string;
    workItemId: string;
    task: WorkItemSchema;
};

const EditWorkItem = ({ id, taskId, workItemId, task }: EditWorkItemProps) => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useEditEntity } = useMutationHook();

    const { mutate, isPending } = useEditEntity<WorkItemSchema>({
        URL: `/projects/${id}/tasks/${taskId}/workItems/${workItemId}/edit`,
        queryKey: ['workItems', id, taskId],
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
                <EditWorkItemForm
                    task={task}
                    handleSubmit={handleSubmit}
                    isPending={isPending}
                />
            </DialogContent>
        </Dialog>
    );
};

export default EditWorkItem;
