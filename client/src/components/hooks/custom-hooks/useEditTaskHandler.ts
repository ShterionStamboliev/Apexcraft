import useTasksApi from '@/components/api/tasksApi';
import { EditTaskSchema } from '@/components/models/task/newTaskSchema';
import { useTaskContext } from '@/context/Task/TaskContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useEditTaskHandler = () => {
    const { id, taskId } = useParams();

    const { getTaskById, editTask } = useTasksApi();

    const { dispatch, state } = useTaskContext();
    const { task, isLoading } = state;

    useEffect(() => {
        if (taskId && (!task || task?.id !== taskId)) {
            dispatch({
                type: 'RESET_TASKS'
            })
            getTask();
        }
    }, [id, taskId]);

    const getTask = async (): Promise<void> => {
        await getTaskById(dispatch, id!, taskId!);
    };

    const handleEditTask = async (updatedTaskData: EditTaskSchema): Promise<void> => {
        await editTask(dispatch, id!, taskId!, updatedTaskData);
    };

    return {
        task,
        isLoading,
        handleEditTask
    };
};