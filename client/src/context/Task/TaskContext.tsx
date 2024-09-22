// TaskContext.tsx
import { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';
import { TaskState, TaskAction } from '@/types/task-types/taskTypes';

interface TaskContextProps {
    state: TaskState;
    dispatch: Dispatch<TaskAction>;
}

const initialState: TaskState = {
    tasks: [],
    task: null,
    isLoading: false,
    isDataFetched: false,
    error: null,
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'GET_TASKS':
            return {
                ...state,
                tasks: action.payload,
                isLoading: false,
                isDataFetched: true,
            };
        case 'GET_TASK_BY_ID':
            return {
                ...state,
                task: action.payload,
                isLoading: false
            };
        case 'CREATE_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                isLoading: false
            };
        case 'EDIT_TASK':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
                isLoading: false,
            };
        case 'RESET_TASKS':
            return {
                ...state,
                tasks: [],
                task: null,
                isLoading: false,
                isDataFetched: false,
            };
        case 'LOADING':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
};

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};