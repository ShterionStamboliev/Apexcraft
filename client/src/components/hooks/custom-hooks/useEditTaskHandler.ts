import useTasksApi from '@/components/api/tasksApi';
import { EditTaskSchema } from '@/components/models/task/newTaskSchema';
import { useParams } from 'react-router-dom';
import { useFetchQuery } from './useFetchQueryHook';
import { Task } from '@/types/task-types/taskTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToastHook from './useToastHook';

export const useEditTaskHandler = () => {
    const { id, taskId } = useParams();
    const queryClient = useQueryClient();

    const { getTaskById, editTask } = useTasksApi();
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const { data, isLoading } = useFetchQuery<Task>(['task', id, taskId], getTaskById);

    const handleEditTask = async (updatedTaskData: EditTaskSchema): Promise<void> => {
        await editTask(id!, taskId!, updatedTaskData);
    };

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: (taskData: EditTaskSchema) => handleEditTask(taskData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['task', id, taskId] });
            queryClient.invalidateQueries({ queryKey: ['projects', id, 'tasks'] })
            fireSuccessToast('Task item updated successfully!');
        },
        onError: () => {
            fireErrorToast('Something went wrong. Please try again.');
        }
    });

    return {
        data,
        isLoading,
        mutate,
        isPending,
        isSuccess
    };
};