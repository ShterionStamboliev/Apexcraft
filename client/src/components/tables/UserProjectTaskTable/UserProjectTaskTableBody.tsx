import ProjectInformationCard from '@/components/forms/user-projects-tasks-form/InformationCards/ProjectInformationCard';
import TaskInformationCard from '@/components/forms/user-projects-tasks-form/InformationCards/TaskInformationCard';
import UserWorkItemCreate from '@/components/forms/user-projects-tasks-form/UserWorkItemFormCreate/UserWorkItemCreate';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import UserProjectWorkItemsList from './UserProjectWorkItemsList';
import { useFetchDataQuery } from '@/components/hooks/custom-hooks/useQueryHook';
import { ProjectTask } from '@/types/task-types/taskTypes';
import { useParams } from 'react-router-dom';

const UserProjectTaskTableBody = () => {
    const { taskId } = useParams<{ taskId: string }>();

    const { data: task } = useFetchDataQuery<ProjectTask>({
        URL: `/my-projects/${taskId}/task`,
        queryKey: ['artisanTasks', taskId],
        options: {
            staleTime: 0,
        },
    });

    return (
        <>
            {
                task && (
                    <div className="container mx-auto p-4">
                        <UserWorkItemCreate />
                        <div className="grid lg:grid-cols-2 gap-20">
                            <ProjectInformationCard
                                project={task}
                            />
                            <TaskInformationCard
                                project={task}
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
                            <UserProjectWorkItemsList
                                workItemsData={task.workItemsData!}
                            />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UserProjectTaskTableBody