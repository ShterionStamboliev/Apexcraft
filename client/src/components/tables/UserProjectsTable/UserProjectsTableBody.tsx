import ProjectTasksSkeleton from '@/components/utils/SkeletonLoader/Tasks/ProjectTasksSkeleton';
import { CircleAlert, ClipboardList } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import UserProjectsCard from './UserProjectsCard';
import { useFetchDataQuery } from '@/components/hooks/custom-hooks/useQueryHook';
import { Task } from '@/types/task-types/taskTypes';
import ConditionalRenderer from '@/components/common/ConditionalRenderer/ConditionalRenderer';

const UserProjectsTableBody = () => {
    const {
        data: tasks,
        isPending,
        isError,
    } = useFetchDataQuery<Task[]>({
        URL: '/my-projects',
        queryKey: ['artisanTasks'],
        options: {
            staleTime: 0,
        },
    });

    if (isPending) {
        return <ProjectTasksSkeleton tasks={tasks} />;
    }

    if (isError) {
        return <ErrorMessage title="Oops..." Icon={CircleAlert} />;
    }

    return (
        <ConditionalRenderer
            data={tasks}
            renderData={(tasks) => <UserProjectsCard tasks={tasks} />}
            noResults={{
                title: 'No tasks found',
                description: "It looks like you haven't added any tasks yet.",
                Icon: ClipboardList,
            }}
        />
    );
};

export default UserProjectsTableBody;
