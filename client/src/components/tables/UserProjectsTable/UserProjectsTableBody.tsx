import ProjectTasksSkeleton from '@/utils/SkeletonLoader/Tasks/ProjectTasksSkeleton';
import { CircleAlert, ClipboardList } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import { Task } from '@/types/task-types/taskTypes';
import ConditionalRenderer from '@/components/common/ConditionalRenderer/ConditionalRenderer';
import { useFetchDataQuery } from '@/hooks/useQueryHook';
import UserProjectsCard from './UserProjectsCard';
import UserBreadcrumb from '@/components/common/Breadcrumbs/UserBreadcrumb';

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
        return <ErrorMessage title='Oops...' Icon={CircleAlert} />;
    }

    return (
        <>
            <UserBreadcrumb />
            <div className='flex flex-col border rounded-lg mt-20 mx-8 p-4 backdrop-blur-sm bg-slate-900/20'>
                <div className='flex flex-wrap sm:w-full gap-4'>
                    <ConditionalRenderer
                        data={tasks}
                        renderData={(tasks) => (
                            <UserProjectsCard tasks={tasks as Task[]} />
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

export default UserProjectsTableBody;
