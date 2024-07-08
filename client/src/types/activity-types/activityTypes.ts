export type Activity = {
    id?: number;
    name: string;
    status: 'активен' | 'неактивен';
}
export interface ActivityFormProps {
    onSuccess?: () => void;
    activity: Activity;
}