export type Activity = {
    id?: string;
    name: string;
    status: 'active' | 'inactive';
}

export type PaginatedActivities = {
    data: Activity[];
    limit?: number;
    total?: number;
    totalPages?: number;
}