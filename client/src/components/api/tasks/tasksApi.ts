import { Task } from '@/types/task-types/taskTypes';
import { apiCall } from '../apiCall';

const useTasksApi = () => {
    const getTaskById = async (id: string, taskId: string): Promise<Task> => {
        const data: Task = await apiCall(`/projects/${id}/tasks/${taskId}`, 'GET');
        return data;
    };

    const editTask = async (id: string, taskId: string, taskData: Task): Promise<void> => {
        return await apiCall(`/projects/${id}/tasks/${taskId}/edit`, 'PUT', taskData);
    };

    return {
        getTaskById,
        editTask,
    }
}

export default useTasksApi;