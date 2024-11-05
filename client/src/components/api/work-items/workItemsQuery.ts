import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToastHook from '@/components/hooks/custom-hooks/useToastHook';
import { WorkItem } from '@/types/task-types/workItemType';
import useWorkItemsApi from './workItemsApi';
import React from 'react';

const { editUserWorkItem } = useWorkItemsApi();

const useWorkItemsQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();
    const useEditUserWorkItem = (
        taskId: string,
        workItemId: string,
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (workItemData: WorkItem) => editUserWorkItem(taskId, workItemId, workItemData),
            onSuccess: () => {
                client.invalidateQueries({ queryKey: ['artisanTasks', taskId] });
                fireSuccessToast('Work item updated successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        })
    }

    return {
        useEditUserWorkItem
    }
}

export default useWorkItemsQuery;