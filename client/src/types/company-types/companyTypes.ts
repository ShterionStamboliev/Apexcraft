export type Company = {
    id?: number;
    name: string;
    number: number;
    address: string;
    mol: string;
    email: string;
    phone: number;
    dds: 'yes' | 'no';
    status: 'active' | 'inactive';
}

export interface CompanyFormProps {
    onSuccess?: () => void;
    company: Company;
}