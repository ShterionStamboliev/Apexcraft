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