export type Project = {
    id?: number;
    name: string;
    company_id: string;
    email: string;
    note: string;
    status: 'active' | 'inactive';
}

export interface ProjectFormProps {
    onSuccess?: () => void;
    project: Project;
}