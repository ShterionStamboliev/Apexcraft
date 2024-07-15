export type Project = {
    id?: number;
    project_name: string;
    project_company: string;
    project_email: string;
    project_note: string;
    status: 'active' | 'inactive';
}