import { WorkItem, WorkItemSchema } from '@/types/task-types/workItemType';
import { apiCall } from '../apiCall';

const useWorkItemsApi = () => {
    const createUserWorkItem = async (taskId: string, workItemData: WorkItemSchema): Promise<void> => {
        const data = apiCall(`/my-projects/${taskId}/task/create`, 'POST', workItemData);
        return data;
    };

    const editUserWorkItem = async (taskId: string, workItemId: string, workItemData: WorkItem) => {
        return await apiCall(`/my-projects/${taskId}/task/${workItemId}/edit`, 'POST', workItemData);
    }

    return {
        createUserWorkItem,
        editUserWorkItem
    }
};

export default useWorkItemsApi;