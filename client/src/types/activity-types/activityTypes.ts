export type Activity = {
    id?: number;
    name: string;
    status: 'active' | 'inactive';
}
export interface ActivityFormProps {
    onSuccess?: () => void;
    activity: Activity;
}