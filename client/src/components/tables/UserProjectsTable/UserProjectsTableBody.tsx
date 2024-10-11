import ProjectTasksSkeleton from '@/components/utils/SkeletonLoader/Tasks/ProjectTasksSkeleton';
import useTasksQuery from '@/components/api/tasks/tasksQuery';
import { CircleAlert, ClipboardList } from 'lucide-react';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import UserProjectsCard from './UserProjectsCard';

const UserProjectsTableBody = () => {
    const { useGetArtisanTasks } = useTasksQuery();

    const { data: tasks, isPending, isError, error } = useGetArtisanTasks();

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
                    description="It looks like you don't have any assigned tasks yet."
                    Icon={ClipboardList}
                />
            ) : (
                <UserProjectsCard
                    tasks={tasks}
                />
            )
            }
        </>
    )
}

export default UserProjectsTableBody