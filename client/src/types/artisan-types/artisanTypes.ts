export type Artisan = {
    id?: number;
    name: string,
    note: string,
    company_id: string;
    status: 'active' | 'inactive';
}

export interface ArtisanFormProps {
    onSuccess?: () => void;
    artisan: Artisan;
}