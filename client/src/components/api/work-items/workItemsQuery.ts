import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useToastHook from '@/components/hooks/custom-hooks/useToastHook';
import { WorkItem, WorkItemSchema } from '@/types/task-types/workItemType';
import useWorkItemsApi from './workItemsApi';
import React from 'react';

const { createUserWorkItem, getAllWorkItems, editUserWorkItem } = useWorkItemsApi();

const useWorkItemsQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const useCreateUserWorkItem = (
        taskId: string,
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (workItemData: WorkItemSchema) => createUserWorkItem(taskId, workItemData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['artisanTasks', taskId]
                });
                fireSuccessToast('Work item created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    const useGetWorkItemsInfinity = (id: string, taskId: string) => {
        return useInfiniteQuery({
            queryKey: ['taskItems', id, taskId],
            queryFn: ({ pageParam = 1 }) => getAllWorkItems({
                pageParam,
                project_id: id,
                task_id: taskId
            }),
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
        useGetWorkItemsInfinity,
        useCreateUserWorkItem,
        useEditUserWorkItem
    }
}

export default useWorkItemsQuery;