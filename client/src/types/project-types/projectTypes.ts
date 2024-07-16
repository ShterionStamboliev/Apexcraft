export type Project = {
    id?: number;
    name: string;
    company_id: string;
    main_email: string;
    note: string;
    status: 'active' | 'inactive';
}

export interface ProjectFormProps {
    onSuccess?: () => void;
    project: Project;
}