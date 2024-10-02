import { useEditTaskForm } from '@/components/hooks/custom-hooks/useEditTaskForm';
import { useEditTaskHandler } from '@/components/hooks/custom-hooks/useEditTaskHandler';
import { EditTaskSchema } from '@/components/models/task/newTaskSchema';
import TaskInformationCard from './TaskFormUtils/TaskInformationCard';
import TaskEditForm from './TaskFormUtils/TaskEditForm';
import { useNavigate, useParams } from 'react-router-dom';
import TaskViewEditSkeleton from '@/components/utils/SkeletonLoader/Tasks/TaskViewEditSkeleton';
import CreateTaskItem from '../TaskItemFormCreate/CreateTaskItem';
import useTaskItemQuery from '@/components/api/task-items/taskItemsQuery';
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import TaskList from './TaskFormUtils/TaskList';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';

const EditTask = () => {
    const { data, isLoading, mutate } = useEditTaskHandler();
    const form = useEditTaskForm(data!);

    const navigate = useNavigate();
    const { id, taskId } = useParams();

    const { ref, inView } = useInView();

    const { getTaskItemsInfinity } = useTaskItemQuery();

    const {
        data: tasksData,
        isLoading: isTaskItemLoading,
        fetchNextPage,
        isFetchingNextPage
    } = getTaskItemsInfinity(id!, taskId!);

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    const submitFormHandler = async (formData: EditTaskSchema) => {
        const updatedTask = {
            ...formData,
            start_date: formData.start_date?.toString(),
            end_date: formData.end_date?.toString(),
        }
        mutate(updatedTask);
        navigate(`/projects/${id}/tasks`);
    };

    if (isLoading) {
        return <TaskViewEditSkeleton />
    }

    return (
        <>
            {data && (
                <div className="container mx-auto p-4">
                    <CreateTaskItem />
                    <div className="grid md:grid-cols-2 gap-20">
                        <TaskInformationCard
                            task={data}
                        />
                        <TaskEditForm
                            form={form}
                            task={data}
                            isLoading={isLoading}
                            submitFormHandler={submitFormHandler}
                        />
                    </div>
                    <div className='mt-10'>
                        <div className='flex justify-center items-center'>
                            <div className='flex justify-center items-center '>
                                <Separator className='flex-grow' />
                                <span className='px-4 text-lg text-muted-foreground flex-shrink-0'>
                                    Task items list
                                </span>
                                <Separator className='flex-grow' />
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <ChevronDown />
                        </div>
                        <TaskList
                            tasksData={tasksData}
                            isFetchingNextPage={isFetchingNextPage}
                            scrollRef={ref}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default EditTask;

