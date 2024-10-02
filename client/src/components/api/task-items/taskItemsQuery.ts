import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useTaskItemsApi from './taskItemsApi';
import useToastHook from '@/components/hooks/custom-hooks/useToastHook';
import { TaskItem, TaskItemSchema } from '@/types/task-types/taskItemType';

const { createTaskItem, getAllTaskItems } = useTaskItemsApi();


const useTaskItemQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const useCreateTaskItem = (
        project_id: string,
        task_id: string,
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (taskData: TaskItemSchema) => createTaskItem(project_id, task_id, taskData),
            onSuccess: () => {
                client.invalidateQueries({ queryKey: ['taskItems', project_id, task_id] })
                fireSuccessToast('Task item created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    const getTaskItemsInfinity = (id: string, taskId: string) => {
        return useInfiniteQuery({
            queryKey: ['taskItems', id, taskId],
            queryFn: ({ pageParam = 1 }) => getAllTaskItems({ pageParam, project_id: id, task_id: taskId }),
            initialPageParam: 1,
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length === 0) {
                    return undefined;
                }
                return pages.length + 1;
            },
            staleTime: 0,
        });
    };

    return {
        useCreateTaskItem,
        getTaskItemsInfinity
    }
}

export default useTaskItemQuery;