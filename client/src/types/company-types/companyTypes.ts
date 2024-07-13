export type Company = {
    id?: number;
    name: string;
    number: number;
    address: string;
    mol: string;
    email: string;
    phone: number;
    dds: boolean;
    status: 'active' | 'inactive';
}