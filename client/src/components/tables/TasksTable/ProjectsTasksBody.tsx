import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTaskContext } from '@/context/Task/TaskContext';
import useTasksApi from '@/components/api/tasksApi';
import { Task } from '@/types/task-types/taskTypes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectsTasksBody = ({ filteredData }: { filteredData: Task[] }) => {
    const { id} = useParams();
    const { getTasks} = useTasksApi();
    const { dispatch, state } = useTaskContext();

    useEffect(() => {
        if (id) {
            dispatch({
                type: 'RESET_TASKS'
            });
            getTasks(dispatch, id);
        }
    }, [id, dispatch]);

    if (state.isLoading) { 
        return <div>Loading... please wait</div>;
    }

    if (filteredData.length === 0) {
        return <div>No results found</div>;
    }

    return (
        <>
            {
                filteredData.map((task) => (
                    <Card className='w-[300px]' key={task.id}>
                        <CardHeader>
                            <CardTitle>
                                <Link to={`/projects/${id}/tasks/${task.id}/edit`}>
                                    {task.name}
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* <CardDescription>
                                Price per measure: {task.price_per_measure}
                            </CardDescription>
                            <CardDescription>
                                Total work: {task.total_work_in_selected_measure}
                            </CardDescription>
                            <CardDescription>
                                Total price: {task.total_price}
                            </CardDescription> */}
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