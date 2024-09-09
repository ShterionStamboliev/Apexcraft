export type Project = {
    id?: number;
    name: string;
    company_name: string;
    start_date?: string;
    end_date?: string;
    email: string;
    note: string;
    address: string;
    status: 'active' | 'inactive';
}

export interface ProjectFormProps {
    onSuccess?: () => void;
    project: Project;
}