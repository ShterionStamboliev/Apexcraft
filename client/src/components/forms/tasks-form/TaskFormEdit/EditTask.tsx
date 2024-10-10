import { useEditTaskForm } from '@/components/hooks/custom-hooks/useEditTaskForm';
import { EditTaskSchema } from '@/components/models/task/newTaskSchema';
import TaskInformationCard from './TaskFormUtils/TaskInformationCard';
import TaskEditForm from './TaskFormUtils/TaskEditForm';
import { useNavigate, useParams } from 'react-router-dom';
import TaskViewEditSkeleton from '@/components/utils/SkeletonLoader/Tasks/TaskViewEditSkeleton';
import useTaskItemQuery from '@/components/api/work-items/workItemsQuery';
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import useTasksQuery from '@/components/api/tasks/tasksQuery';
import CreateWorkItem from '../../work-items-form/WorkItemFormCreate/CreateWorkItem';
import WorkItemsList from './TaskFormUtils/WorkItemsList';

const EditTaskForm = () => {
    const { id, taskId } = useParams();
    const navigate = useNavigate();
    const { ref, inView } = useInView();

    const { useEditTask, useGetTask } = useTasksQuery();

    const { data: task, isLoading } = useGetTask();

    const { mutate, isPending } = useEditTask();

    const form = useEditTaskForm(task!);
    const isFormDirty = form.formState.isDirty;

    const { useGetWorkItemsInfinity } = useTaskItemQuery();
    const {
        data: workItemsData,
        fetchNextPage,
        isFetchingNextPage,
        isLoading: isWorkItemsLoading,
    } = useGetWorkItemsInfinity(id!, taskId!);

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
            {task && (
                <div className="container mx-auto p-4">
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
                        <div className='flex justify-center items-center'>
                            <div className='flex justify-center items-center '>
                                <Separator className='flex-grow w-[5rem] md:w-[10rem]' />
                                <span className='px-4 text-lg text-muted-foreground flex-shrink-0'>
                                    Work items list
                                </span>
                                <Separator className='flex-grow w-[5rem] md:w-[10rem]' />
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <ChevronDown />
                        </div>
                        <WorkItemsList
                            workItemsData={workItemsData}
                            isFetchingNextPage={isFetchingNextPage}
                            scrollRef={ref}
                            isWorkItemsLoading={isWorkItemsLoading}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default EditTaskForm;

