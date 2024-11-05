import useToastHook from '@/components/hooks/custom-hooks/useToastHook';
import useTasksApi from './tasksApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskSchema } from '@/components/models/task/newTaskSchema';
import { useParams } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';

type DialogStateAction = {
    id?: string;
    taskId?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    form?: UseFormReturn
}

const useTasksQuery = () => {
    const { createTask, editTask, getTaskById, getArtisanTaskProject } = useTasksApi();

    const { id, taskId } = useParams<{ id: string, taskId: string }>();

    const { fireErrorToast, fireSuccessToast } = useToastHook();


    const useGetArtisanTaskProject = () => {
        return useQuery({
            queryFn: () => getArtisanTaskProject(taskId!),
            queryKey: ['artisanTasks', taskId],
            staleTime: 0,
        });
    };

    const useGetTask = () => {
        return useQuery({
            queryFn: () => getTaskById(id!, taskId!),
            queryKey: ['task', id, taskId],
            staleTime: 0,
        });
    };

    const useCreateTask = ({ setIsOpen, form }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (taskData: TaskSchema) => createTask(id!, taskData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['projects', id, 'tasks'],
                });
                fireSuccessToast('Task created successfully!');
                setIsOpen(false);
                form?.reset();
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.')
            },
        });
    };

    const useEditTask = () => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (taskData: TaskSchema) => editTask(id!, taskId!, taskData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['projects', id, 'tasks'],
                });
                client.invalidateQueries({
                    queryKey: ['task', id, taskId],
                });
                fireSuccessToast('Task updated successfully!');
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            },
        });
    };

    return {
        useCreateTask,
        useEditTask,
        useGetTask,
        useGetArtisanTaskProject
    }
};

export default useTasksQuery;