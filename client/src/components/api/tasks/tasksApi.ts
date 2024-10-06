import { Task } from '@/types/task-types/taskTypes';
import { apiCall } from '../apiCall';

const useTasksApi = () => {
    const createTask = async (id: string, taskData: Task): Promise<Task> => {
        const data = await apiCall(`/projects/${id}/create-task`, 'POST', taskData);
        return data;
    };

    const getTasks = async (id: string): Promise<Task[]> => {
        const data: Task[] = await apiCall(`/projects/${id}/tasks`, 'GET');
        return data;
    };

    const getTaskById = async (id: string, taskId: string): Promise<Task> => {
        const data: Task = await apiCall(`/projects/${id}/tasks/${taskId}`, 'GET');
        return data;
    };

    const editTask = async (id: string, taskId: string, taskData: Task): Promise<void> => {
        return await apiCall(`/projects/${id}/tasks/${taskId}/edit`, 'PUT', taskData);
    };

    return {
        createTask,
        getTasks,
        getTaskById,
        editTask,
    }
}

export default useTasksApi;