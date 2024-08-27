export type Artisan = {
    id?: number;
    name: string,
    note: string,
    number: string,
    email: string,
    company: string;
    status: 'active' | 'inactive';
}

export interface ArtisanFormProps {
    onSuccess?: () => void;
    artisan: Artisan;
}