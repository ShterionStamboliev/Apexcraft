import { Dispatch } from 'react';
import { Task, TaskAction } from '@/types/task-types/taskTypes';
import { useAuth } from '@/context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const useTasksApi = () => {
    // const { token } = useAuth();

    const getTasks = async (dispatch: Dispatch<TaskAction>, projectId: string): Promise<void> => {
        dispatch({
            type: 'LOADING'
        });

        try {
            const response = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
                // headers: {
                //     // Authorization: `Bearer ${token}`
                // },
                credentials: 'include',
            });

            const data: Task[] = await response.json();
            
            dispatch({
                type: 'GET_TASKS',
                payload: data
            });
        } catch (error) {
            dispatch({
                type: 'ERROR',
                payload: (error as Error).message
            });
        }
    };

    const getTaskById = async (dispatch: Dispatch<TaskAction>, projectId: string, taskId: string): Promise<void> => {
        dispatch({
            type: 'LOADING'
        });

        try {
            const response = await fetch(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {
                // headers: {
                //     // Authorization: `Bearer ${token}`
                // },
                credentials: 'include',
            });

            const data: Task = await response.json();

            dispatch({
                type: 'GET_TASK_BY_ID',
                payload: data
            });
        } catch (error) {
            dispatch({
                type: 'ERROR',
                payload: (error as Error).message
            });
        }
    };

    const createTask = async (dispatch: Dispatch<TaskAction>, projectId: string, taskData: Task): Promise<void> => {
        dispatch({
            type: 'LOADING'
        });

        try {
            const response = await fetch(`${API_URL}/projects/${projectId}/create-task`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskData),
                credentials: 'include',
            });

            const data: Task = await response.json();

            dispatch({
                type: 'CREATE_TASK',
                payload: data
            });
        } catch (error) {
            dispatch({
                type: 'ERROR',
                payload: (error as Error).message
            });
        }
    };

    const editTask = async (dispatch: Dispatch<TaskAction>, id: string, taskId: string, taskData: Task): Promise<void> => {
        dispatch({
            type: 'LOADING'

        });

        try {
            const response = await fetch(`${API_URL}/projects/${id}/task/${taskId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskData),
                credentials: 'include',
            });

            const data: Task = await response.json();
            
            dispatch({
                type: 'EDIT_TASK',
                payload: data
            });
        } catch (error) {
            dispatch({
                type: 'ERROR',
                payload: (error as Error).message
            });
        }
    };

    return {
        createTask,
        editTask,
        getTaskById,
        getTasks
    }
}

export default useTasksApi;