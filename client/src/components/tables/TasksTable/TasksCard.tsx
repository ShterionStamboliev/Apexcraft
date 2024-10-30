import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types/task-types/taskTypes'
import { Link } from 'react-router-dom';

type TasksCardProps = {
    tasks: Task[];
    id: string;
}

const TasksCard = ({ tasks, id }: TasksCardProps) => {
    return (
        <>
            {
                tasks.map((task) => (
                    <Card className='w-[300px]' key={task.id}>
                        <CardHeader className='bg-header rounded-t-lg p-5'>
                            <CardTitle>
                                <Link to={`/projects/${id}/tasks/${task.id}/edit`}>
                                    {task.name}
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='p-5'>
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

export default TasksCard