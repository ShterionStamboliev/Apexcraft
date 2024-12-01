export type WorkItem = {
    id?: string;
    task_id?: string;
    name?: string;
    start_date?: string;
    end_date?: string;
    note?: string;
    finished_work?: string;
    status?: 'done' | 'in_progress';
};

export interface PaginatedWorkItems {
    pages: WorkItem[][];
    pageParams: number[];
}
