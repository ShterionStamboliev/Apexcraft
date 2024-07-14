export type Company = {
    id?: number;
    company_name: string;
    company_number: number;
    company_address: string;
    company_mol: string;
    company_email: string;
    company_phone: number;
    company_dds: 'yes' | 'no';
    status: 'active' | 'inactive';
}

export interface CompanyFormProps {
    onSuccess?: () => void;
    company: Company;
}