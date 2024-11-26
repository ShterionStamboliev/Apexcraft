import { useParams } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import { taskSchema, TaskSchema } from '@/models/task/taskSchema';
import DialogTriggerButtonCreate from '@/components/common/DialogElements/DialogTriggerButtonCreate';
import CreateTaskForm from './CreateTaskForm';
import useDialogState from '@/hooks/useDialogState';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';
import { useMutationHook } from '@/hooks/useMutationHook';

const CreateTask = () => {
    const { id } = useParams();

    const { isOpen, setIsOpen } = useDialogState();

    const { useCreateNewEntity } = useMutationHook();

    const { mutate, isPending } = useCreateNewEntity<TaskSchema>({
        URL: `/projects/${id}/create-task`,
        queryKey: ['projects', id, 'tasks'],
        successToast: 'Task created successfully!',
        setIsOpen,
    });

    const handleSubmit = useSubmitHandler(mutate, taskSchema);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonCreate
                className='md:w-full lg:max-w-[12rem]'
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
    );
};

export default CreateTask;
