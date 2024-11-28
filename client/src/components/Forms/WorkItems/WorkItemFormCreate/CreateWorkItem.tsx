import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    workItemSchema,
    WorkItemSchema,
} from '@/types/task-types/workItemType';
import { useParams } from 'react-router-dom';
import CreateWorkItemForm from './CreateWorkItemForm';
import useDialogState from '@/hooks/useDialogState';
import { useMutationHook } from '@/hooks/useMutationHook';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';

const CreateWorkItem = () => {
    const { id, taskId } = useParams();
    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();

    const { mutate, isPending } = useCreateNewEntity<WorkItemSchema>({
        URL: `/projects/${id}/tasks/${taskId}/workItems/create`,
        queryKey: ['workItems', id, taskId],
        successToast: 'Work item created successfully!',
        setIsOpen,
    });

    const handleSubmit = useSubmitHandler(mutate, workItemSchema);

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
                    <CreateWorkItemForm
                        handleSubmit={handleSubmit}
                        isPending={isPending}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateWorkItem;
