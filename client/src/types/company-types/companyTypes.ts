export type Company = {
    id?: number;
    name: string;
    number: string;
    address: string;
    mol: string;
    email: string;
    phone: string;
    dds: 'yes' | 'no';
    status: 'active' | 'inactive';
}

export interface CompanyFormProps {
    onSuccess?: () => void;
    company: Company;
}