import { useEditTaskForm } from '@/components/hooks/custom-hooks/useEditTaskForm';
import { useEditTaskHandler } from '@/components/hooks/custom-hooks/useEditTaskHandler';
import { EditTaskSchema } from '@/components/models/task/newTaskSchema';
import TaskInformationCard from './TaskFormUtils/TaskInformationCard';
import TaskEditForm from './TaskFormUtils/TaskEditForm';
import { useNavigate, useParams } from 'react-router-dom';
import useToastHook from '@/components/hooks/custom-hooks/useToastHook';

const EditTask = () => {
    const { task, isLoading, handleEditTask } = useEditTaskHandler();
    const form = useEditTaskForm(task!);

    const { fireErrorToast, fireSuccessToast } = useToastHook();

    const navigate = useNavigate();
    const { id } = useParams();

    const submitFormHandler = async (formData: EditTaskSchema) => {
        const updatedTask = {
            ...formData,
            start_date: formData.start_date?.toString(),
            end_date: formData.end_date?.toString(),
        }

        try {
            await handleEditTask(updatedTask);
            fireSuccessToast('Task edit success');
        } catch (error) {
            fireErrorToast('Error while submitting');
        }
        navigate(`/projects/${id}/tasks`);
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {task && (
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-6 text-center">Task management</h1>
                    <div className="grid md:grid-cols-2 gap-20">
                        <TaskInformationCard
                            task={task}
                        />
                        <TaskEditForm
                            form={form}
                            task={task}
                            isLoading={isLoading}
                            submitFormHandler={submitFormHandler}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default EditTask;