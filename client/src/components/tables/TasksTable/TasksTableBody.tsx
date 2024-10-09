import { useParams } from 'react-router-dom';
import ProjectTasksSkeleton from '@/components/utils/SkeletonLoader/Tasks/ProjectTasksSkeleton';
import useTasksQuery from '@/components/api/tasks/tasksQuery';
import { CircleAlert, ClipboardList } from 'lucide-react';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import TasksCard from './TasksCard';

const ProjectsTasksBody = () => {
    const { id } = useParams();

    const { useGetTasks } = useTasksQuery();
    const { data: tasks, isPending, isError, error } = useGetTasks();

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
            {tasks.length === 0 ? (
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