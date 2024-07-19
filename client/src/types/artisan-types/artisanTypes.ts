export type Artisan = {
    id?: number;
    name: string,
    note: string,
    company_id: string;
    companyName?: string;
    status: 'active' | 'inactive';
}

export interface ArtisanFormProps {
    onSuccess?: () => void;
    artisan: Artisan;
}