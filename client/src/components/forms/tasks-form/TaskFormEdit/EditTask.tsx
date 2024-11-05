import { useEditTaskForm } from '@/components/hooks/custom-hooks/useEditTaskForm';
import { EditTaskSchema } from '@/components/models/task/newTaskSchema';
import TaskInformationCard from './TaskFormUtils/TaskInformationCard';
import TaskEditForm from './TaskFormUtils/TaskEditForm';
import { useNavigate, useParams } from 'react-router-dom';
import TaskViewEditSkeleton from '@/components/utils/SkeletonLoader/Tasks/TaskViewEditSkeleton';
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import useTasksQuery from '@/components/api/tasks/tasksQuery';
import CreateWorkItem from '../../work-items-form/WorkItemFormCreate/CreateWorkItem';
import WorkItemsList from './TaskFormUtils/WorkItemsList';
import WorkItemsListSeparator from './TaskFormUtils/WorkItemsListSeparator';
import TasksEditBreadcrumbs from '@/components/common/Breadcrumbs/TasksEditBreadcrumbs';
import { useGetInfiniteData } from '@/components/hooks/custom-hooks/useQueryHook';

const EditTaskForm = () => {
    const { id, taskId } = useParams();
    const navigate = useNavigate();
    const { ref, inView } = useInView();

    const { useEditTask, useGetTask } = useTasksQuery();

    const { data: task, isLoading } = useGetTask();

    const { mutate, isPending } = useEditTask();

    const form = useEditTaskForm(task!);
    const isFormDirty = form.formState.isDirty;

    const {
        data: workItemsData,
        fetchNextPage,
        isFetchingNextPage,
        isPending: isWorkItemsLoading
    } = useGetInfiniteData({
        URL: `/projects/${id}/tasks/${taskId}`,
        queryKey: ['workItems', id, taskId],
    });

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    const handleSubmit = async (formData: EditTaskSchema) => {
        mutate(formData, {
            onSuccess: () => {
                navigate(`/projects/${id}/tasks`);
            }
        });
    };

    if (isLoading) {
        return <TaskViewEditSkeleton />
    };

    return (
        <>
            {
                task && (
                    <div className="container mx-auto p-4">
                        <div className='mb-6'>
                            <TasksEditBreadcrumbs
                                id={id!}
                                taskId={taskId!}
                            />
                        </div>
                        <CreateWorkItem />
                        <div className="grid lg:grid-cols-2 gap-20">
                            <TaskInformationCard
                                task={task}
                            />
                            <TaskEditForm
                                form={form}
                                task={task}
                                isLoading={isPending}
                                submitFormHandler={handleSubmit}
                                isFormDirty={isFormDirty}
                            />
                        </div>
                        <div className='mt-10'>
                            <WorkItemsListSeparator />
                            <WorkItemsList
                                workItemsData={workItemsData}
                                isFetchingNextPage={isFetchingNextPage}
                                scrollRef={ref}
                                isWorkItemsLoading={isWorkItemsLoading}
                            />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default EditTaskForm;

