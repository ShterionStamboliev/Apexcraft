import { Link, useParams } from 'react-router-dom';
import useTasksApi from '@/components/api/tasksApi';
import { Task } from '@/types/task-types/taskTypes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFetchQuery } from '@/components/hooks/custom-hooks/useFetchQueryHook';
import ProjectTasksSkeleton from '@/components/utils/SkeletonLoader/Tasks/ProjectTasksSkeleton';

const ProjectsTasksBody = ({ filteredData }: { filteredData: Task[] }) => {
    const { id } = useParams();
    const { getTasks } = useTasksApi();

    const { data, isLoading } = useFetchQuery<Task[]>(['projects', id, 'tasks'], getTasks, {
        staleTime: 0,
    });

    if (isLoading) {
        return <ProjectTasksSkeleton data={data} />
    }

    if (data?.length === 0) {
        return <h1>No results found.</h1>
    }

    return (
        <>
            {data && data.map((task) => (
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