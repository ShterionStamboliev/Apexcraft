export type Artisan = {
    id?: number;
    name: string,
    note: string,
    company: string;
    status: 'active' | 'inactive';
}

export interface ArtisanFormProps {
    onSuccess?: () => void;
    artisan: Artisan;
}