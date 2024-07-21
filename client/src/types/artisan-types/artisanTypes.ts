export type Artisan = {
    id?: number;
    name: string,
    note: string,
    company: string;
    companyId?: string;
    status: 'active' | 'inactive';
}

export interface ArtisanFormProps {
    onSuccess?: () => void;
    artisan: Artisan;
}