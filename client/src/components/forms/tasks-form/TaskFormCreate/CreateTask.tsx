import { useParams } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import { TaskSchema } from '@/components/models/task/newTaskSchema';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import useDialogState from '@/components/hooks/custom-hooks/useDialogState';
import CreateTaskForm from './CreateTaskForm';
import { useMutationHook } from '@/components/hooks/custom-hooks/useMutationHook';

const CreateTask = () => {
    const { id } = useParams();

    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();

    const { mutate, isPending } = useCreateNewEntity<TaskSchema>({
        URL: `/projects/${id}/create-task`,
        queryKey: ['projects', id, 'tasks'],
        successToast: 'Task created successfully!',
        setIsOpen
    });

    const handleSubmit = async (taskData: TaskSchema) => {
        mutate(taskData);
    };

    return (
        <div className='mb-4'>
            <Dialog
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DialogTriggerButtonCreate
                    text='Create new task'
                />
                <DialogContent className='max-w-[400px] rounded-md sm:max-w-[525px] gap-0'>
                    <DialogHeader title='Create new task' />
                    <CreateTaskForm
                        handleSubmit={handleSubmit}
                        isPending={isPending}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateTask;
