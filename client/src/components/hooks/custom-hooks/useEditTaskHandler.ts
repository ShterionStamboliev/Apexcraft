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

    const { data, isLoading } = useFetchQuery<Task>(['task', id, taskId], getTaskById, {
        staleTime: 0,
    });

    const handleEditTask = async (updatedTaskData: EditTaskSchema): Promise<void> => {
        await editTask(id!, taskId!, updatedTaskData);
    };

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: handleEditTask,
        onMutate: async (updatedTask) => {
            await queryClient.cancelQueries(
                { queryKey: ['projects', id, 'tasks'] }
            );

            const previousTasks = queryClient.getQueryData(['projects', id, 'tasks']);
            queryClient.setQueryData(
                ['projects', id, 'tasks'],
                (oldData: Task) => [oldData, updatedTask]
            );

            return { previousTasks }
        },
        onError: (err, updatedTask, context) => {
            queryClient.setQueryData(
                ['projects', id, 'tasks'],
                context?.previousTasks
            )
            fireErrorToast('Something went wrong. Please try again.');
        },
        onSettled: () => {
            fireSuccessToast('Task updated successfully,');
            queryClient.invalidateQueries({
                queryKey: ['projects', id, 'tasks']
            });
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