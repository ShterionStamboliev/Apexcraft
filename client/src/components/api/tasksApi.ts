import { Task } from '@/types/task-types/taskTypes';
import { apiCall } from './apiCall';
import { QueryKey } from '@tanstack/react-query';

const useTasksApi = () => {
    const createTask = async (id: string, taskData: Task): Promise<void> => {
        const data = await apiCall(`/projects/${id}/create-task`, 'POST', taskData);
        return data;
    };

    const getTasks = async ({ queryKey }: { queryKey: QueryKey }): Promise<Task[]> => {
        const id = queryKey[1] as string;
        const data: Task[] = await apiCall(`/projects/${id}/tasks`, 'GET');
        return data;
    };

    const getTaskById = async ({ queryKey }: { queryKey: QueryKey }): Promise<Task> => {
        const projectId = queryKey[1] as string;
        const taskId = queryKey[2] as string;
        const data: Task = await apiCall(`/projects/${projectId}/tasks/${taskId}`, 'GET');
        return data;
    };

    const editTask = async (id: string, taskId: string, taskData: Task): Promise<void> => {
        await apiCall(`/projects/${id}/task/${taskId}/edit`, 'PUT', taskData);
    };

    return {
        createTask,
        getTasks,
        getTaskById,
        editTask,
    }
}

export default useTasksApi;