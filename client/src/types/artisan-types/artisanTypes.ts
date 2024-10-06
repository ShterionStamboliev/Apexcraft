export type Artisan = {
    id?: string;
    name: string,
    note?: string,
    number: string,
    email: string,
    company: string;
    status?: 'active' | 'inactive';
}