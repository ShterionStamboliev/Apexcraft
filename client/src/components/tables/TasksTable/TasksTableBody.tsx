import { useParams } from 'react-router-dom';
import ProjectTasksSkeleton from '@/components/utils/SkeletonLoader/Tasks/ProjectTasksSkeleton';
import { CircleAlert, ClipboardList } from 'lucide-react';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import TasksCard from './TasksCard';
import { useFetchDataQuery } from '@/components/hooks/custom-hooks/useQueryHook';
import { Task } from '@/types/task-types/taskTypes';

const ProjectsTasksBody = () => {
    const { id } = useParams();

    const { data: tasks, isPending, isError, error } = useFetchDataQuery<Task[]>({
        URL: `/projects/${id}/tasks`,
        queryKey: ['projects', id, 'tasks'],
        options: {
            staleTime: 0,
        },
    });

    if (isPending) {
        return <ProjectTasksSkeleton count={5} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            error={`${error.message}. Please try again.`}
            Icon={CircleAlert}
        />
    };

    return (
        <>
            {
                tasks.length === 0 ? (
                    <NoResultsFound
                        title='No tasks found'
                        description="It looks like you haven't added any tasks yet."
                        Icon={ClipboardList}
                    />
                ) : (
                    <TasksCard
                        id={id!}
                        tasks={tasks}
                    />
                )
            }
        </>
    )
}

export default ProjectsTasksBody