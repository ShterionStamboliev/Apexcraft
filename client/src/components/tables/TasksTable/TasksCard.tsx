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
                    <Card className='w-[21rem]' key={task.id}>
                        <CardHeader className='bg-header rounded-t-lg p-5'>
                            <CardTitle>
                                <Link to={`/projects/${id}/tasks/${task.id}/edit`} className='hover:underline'>
                                    {task.name}
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='p-5'>
                            <CardDescription>
                                <span className='font-semibold pr-1'>Start date:</span>
                                <span>{new Date(task.start_date!).toLocaleDateString().slice(0, 10)}</span>
                            </CardDescription>
                            <CardDescription>
                                <span className='font-semibold pr-1'>End date:</span>
                                <span>{new Date(task.end_date!).toLocaleDateString().slice(0, 10)}</span>
                            </CardDescription>
                            <CardDescription>
                                <span className='font-semibold pr-1'>Task status:</span>
                                <span>{task.status}</span>
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}

export default TasksCard