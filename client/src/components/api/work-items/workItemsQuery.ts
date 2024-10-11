import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useToastHook from '@/components/hooks/custom-hooks/useToastHook';
import { WorkItem, WorkItemSchema } from '@/types/task-types/workItemType';
import useWorkItemsApi from './workItemsApi';
import React from 'react';

const { createWorkItem, createUserWorkItem, getAllWorkItems, editWorkItem, editUserWorkItem } = useWorkItemsApi();

const useWorkItemsQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const useCreateWorkItem = (
        project_id: string,
        task_id: string,
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (taskData: WorkItemSchema) => createWorkItem(project_id, task_id, taskData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['taskItems', project_id, task_id]
                });
                fireSuccessToast('Task item created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

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

    const useEditWorkItem = (
        projectId: string,
        taskId: string,
        itemId: string,
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (workItemData: WorkItem) => editWorkItem(projectId, taskId, itemId, workItemData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['taskItems', projectId, taskId]
                });
                fireSuccessToast('Work item updated successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        })
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
        useCreateWorkItem,
        useGetWorkItemsInfinity,
        useEditWorkItem,
        useCreateUserWorkItem,
        useEditUserWorkItem
    }
}

export default useWorkItemsQuery;