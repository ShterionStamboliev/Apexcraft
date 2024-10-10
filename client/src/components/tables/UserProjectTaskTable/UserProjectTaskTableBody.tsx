import useTasksQuery from '@/components/api/tasks/tasksQuery';
import ProjectInformationCard from '@/components/forms/user-projects-tasks-form/InformationCards/ProjectInformationCard';
import TaskInformationCard from '@/components/forms/user-projects-tasks-form/InformationCards/TaskInformationCard';
import UserWorkItemCreate from '@/components/forms/user-projects-tasks-form/UserWorkItemFormCreate/UserWorkItemCreate';

const UserProjectTaskTableBody = () => {
    const { useGetArtisanTaskProject } = useTasksQuery();

    const { data: task } = useGetArtisanTaskProject();

    return (
        <>
            {task &&
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
                </div>
            }
        </>
    )
}

export default UserProjectTaskTableBody