import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectTasksSkeleton from '@/components/utils/SkeletonLoader/Tasks/ProjectTasksSkeleton';
import useTasksQuery from '@/components/api/tasks/tasksQuery';

const ProjectsTasksBody = () => {
    const { id } = useParams();

    const { useGetTasks } = useTasksQuery();
    const { data: projects, isPending, isError, error } = useGetTasks();

    if (isPending) {
        return <ProjectTasksSkeleton data={projects} />
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    if (projects?.length === 0) {
        return <h1>No results found.</h1>
    }

    return (
        <>
            {projects.map((task) => (
                <Card className='w-[300px]' key={task.id}>
                    <CardHeader>
                        <CardTitle>
                            <Link to={`/projects/${id}/tasks/${task.id}/edit`}>
                                {task.name}
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Start date: {new Date(task.start_date!).toLocaleDateString().slice(0, 10)}
                        </CardDescription>
                        <CardDescription>
                            End date: {new Date(task.end_date!).toLocaleDateString().slice(0, 10)}
                        </CardDescription>
                        <CardDescription>
                            Task status: {task.status}
                        </CardDescription>
                    </CardContent>
                </Card>
            ))
            }
        </>
    )
}

export default ProjectsTasksBody