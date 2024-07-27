export type Activity = {
    id?: number;
    name: string;
    dateFrom?: string,
    dateTo?: string,
    status: 'active' | 'inactive';
}
export interface ActivityFormProps {
    onSuccess?: () => void;
    activity: Activity;
}