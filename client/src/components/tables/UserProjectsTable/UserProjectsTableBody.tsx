import ProjectTasksSkeleton from '@/components/utils/SkeletonLoader/Tasks/ProjectTasksSkeleton';
import { CircleAlert, ClipboardList } from 'lucide-react';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import UserProjectsCard from './UserProjectsCard';
import { useFetchDataQuery } from '@/components/hooks/custom-hooks/useQueryHook';
import { Task } from '@/types/task-types/taskTypes';

const UserProjectsTableBody = () => {
    const { data: tasks, isPending, isError, error } = useFetchDataQuery<Task[]>({
        URL: '/my-projects',
        queryKey: ['artisanTasks'],
        options: {
            staleTime: 0
        }
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