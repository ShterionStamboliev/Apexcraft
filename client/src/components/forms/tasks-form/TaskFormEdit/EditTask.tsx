import { useEditTaskForm } from '@/components/hooks/custom-hooks/useEditTaskForm';
import { useEditTaskHandler } from '@/components/hooks/custom-hooks/useEditTaskHandler';
import { EditTaskSchema } from '@/components/models/task/newTaskSchema';
import TaskInformationCard from './TaskFormUtils/TaskInformationCard';
import TaskEditForm from './TaskFormUtils/TaskEditForm';

const EditTask = () => {
    const { task, isLoading, handleEditTask } = useEditTaskHandler();
    const form = useEditTaskForm(task!);

    const submitFormHandler = async (formData: EditTaskSchema) => {
        const updatedTask = {
            ...formData,
            start_date: formData.start_date?.toString(),
            end_date: formData.end_date?.toString(),
        }
        await handleEditTask(updatedTask);
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