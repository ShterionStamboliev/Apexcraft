export type Activity = {
    id?: number;
    name: string;
    start_date?: string,
    end_date?: string,
    status: 'active' | 'inactive';
}
export interface ActivityFormProps {
    onSuccess?: () => void;
    activity: Activity;
}