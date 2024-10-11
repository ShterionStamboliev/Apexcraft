import { WorkItem } from './workItemType';

export type Task = {
    id?: string;
    name?: string;
    artisan?: string;
    activity?: string;
    measure?: string;
    artisanName?: string;
    activityName?: string;
    measureName?: string;
    price_per_measure?: number;
    total_price?: number;
    total_work_in_selected_measure?: number;
    start_date?: string;
    end_date?: string;
    note?: string;
    status?: 'active' | 'inactive';
}

export type ProjectTask = {
    taskProjectData: {
        id?: string;
        name?: string;
        artisan?: string;
        activity?: string;
        measure?: string;
        artisanName?: string;
        activityName?: string;
        measureName?: string;
        price_per_measure?: number;
        total_price?: number;
        total_work_in_selected_measure?: number;
        start_date?: string;
        end_date?: string;
        note?: string;
        project_company_name?: string;
        project_name?: string;
        project_address?: string;
        project_status?: string;
        project_start_date?: string;
        project_end_date?: string;
        status?: 'active' | 'inactive';
    },
    workItemsData?: WorkItem[];
}