import { WorkItem, WorkItemSchema } from '@/types/task-types/workItemType';
import { apiCall } from '../apiCall';

const useWorkItemsApi = () => {
    const createUserWorkItem = async (taskId: string, workItemData: WorkItemSchema): Promise<void> => {
        const data = apiCall(`/my-projects/${taskId}/task/create`, 'POST', workItemData);
        return data;
    };

    const getAllWorkItems = async ({ project_id, task_id, pageParam }: { pageParam?: number, project_id?: string, task_id?: string }): Promise<WorkItem[]> => {
        const data = apiCall(`/projects/${project_id}/tasks/${task_id}/workItems?_page=${pageParam}&_limit=4`, 'GET');
        return data;
    };

    const editUserWorkItem = async (taskId: string, workItemId: string, workItemData: WorkItem) => {
        return await apiCall(`/my-projects/${taskId}/task/${workItemId}/edit`, 'POST', workItemData);
    }

    return {
        getAllWorkItems,
        createUserWorkItem,
        editUserWorkItem
    }
};

export default useWorkItemsApi;