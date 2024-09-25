export type Task = {
    id?: string;
    name?: string;
    artisan?: string;
    activity?: string;
    measure?: string;
    price_per_measure?: string | number;
    total_price?: string | number;
    total_work_in_selected_measure?: string | number;
    start_date?: string;
    end_date?: string;
    note?: string;
    status?: 'active' | 'inactive';
}

export interface TaskState {
    tasks: Task[];
    task: Task | null;
    isLoading: boolean;
    isDataFetched: boolean;
    error: string | null;
}

export type TaskAction =
    | { type: 'GET_TASKS'; payload: Task[] }
    | { type: 'GET_TASK_BY_ID'; payload: Task }
    | { type: 'CREATE_TASK'; payload: Task }
    | { type: 'EDIT_TASK'; payload: Task }
    | { type: 'RESET_TASKS'; }
    | { type: 'LOADING' }
    | { type: 'ERROR'; payload: string }

export interface TaskFormProps {
    onSuccess?: () => void;
    task: Task;
}