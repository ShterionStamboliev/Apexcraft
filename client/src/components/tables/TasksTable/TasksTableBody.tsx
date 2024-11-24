import { useParams } from 'react-router-dom';
import ProjectTasksSkeleton from '@/components/utils/SkeletonLoader/Tasks/ProjectTasksSkeleton';
import { CircleAlert, ClipboardList } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import TasksCard from './TasksCard';
import { useFetchDataQuery } from '@/components/hooks/custom-hooks/useQueryHook';
import { Task } from '@/types/task-types/taskTypes';
import ConditionalRenderer from '@/components/common/ConditionalRenderer/ConditionalRenderer';
import CreateTask from '@/components/forms/tasks-form/TaskFormCreate/CreateTask';

const ProjectsTasksBody = () => {
    const { id } = useParams();

    const {
        data: tasks,
        isPending,
        isError,
    } = useFetchDataQuery<Task[]>({
        URL: `/projects/${id}/tasks`,
        queryKey: ['projects', id, 'tasks'],
        options: {
            staleTime: 0,
        },
    });

    if (isPending) {
        return <ProjectTasksSkeleton tasks={tasks} />;
    }

    if (isError) {
        return <ErrorMessage title='Oops...' Icon={CircleAlert} />;
    }

    return (
        <>
            <div className='flex flex-col border rounded-lg mt-8 mx-8 space-y-4 p-4 backdrop-blur-sm bg-slate-900/20'>
                <CreateTask />
            </div>
            <div className='flex flex-col border rounded-lg mt-8 mb-24 md:mt-0 mx-8 p-4 backdrop-blur-sm bg-slate-900/20'>
                <div className='flex flex-wrap sm:w-full gap-4'>
                    <ConditionalRenderer
                        data={tasks}
                        renderData={(tasks) => (
                            <TasksCard tasks={tasks} id={id!} />
                        )}
                        noResults={{
                            title: 'No tasks found',
                            description:
                                "It looks like you haven't added any tasks yet.",
                            Icon: ClipboardList,
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default ProjectsTasksBody;
