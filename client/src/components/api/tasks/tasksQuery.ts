import useTasksApi from './tasksApi';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const useTasksQuery = () => {
    const { getTaskById } = useTasksApi();

    const { id, taskId } = useParams<{ id: string, taskId: string }>();


    const useGetTask = () => {
        return useQuery({
            queryFn: () => getTaskById(id!, taskId!),
            queryKey: ['task', id, taskId],
            staleTime: 0,
        });
    };

    return {
        useGetTask,
    }
};

export default useTasksQuery;