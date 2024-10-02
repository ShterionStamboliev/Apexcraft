import { TaskItem, TaskItemSchema } from '@/types/task-types/taskItemType';
import { apiCall } from '../apiCall';

const useTaskItemsApi = () => {
    const createTaskItem = async (project_id?: string, task_id?: string, taskItemData?: TaskItemSchema): Promise<void> => {
        const data = apiCall(`/projects/${project_id}/tasks/${task_id}/workItems/create`, 'POST', taskItemData);
        return data;
    };

    const getAllTaskItems = async ({ project_id, task_id, pageParam }: { pageParam?: number, project_id?: string, task_id?: string }): Promise<TaskItem[]> => {
        const data = apiCall(`/projects/${project_id}/tasks/${task_id}/workItems?_page=${pageParam}&_limit=5`, 'GET');
        return data;
    }

    return {
        createTaskItem,
        getAllTaskItems
    }
};

export default useTaskItemsApi;