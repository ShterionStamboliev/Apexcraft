export type Company = {
    id?: number;
    name: string;
    number: number | string;
    address: string;
    mol: string;
    email: string;
    phone: number | string;
    dds: 'yes' | 'no';
    status: 'active' | 'inactive';
}

export interface CompanyFormProps {
    onSuccess?: () => void;
    company: Company;
}