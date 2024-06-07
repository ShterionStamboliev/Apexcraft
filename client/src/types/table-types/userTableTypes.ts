export type UserTableData = {
    id?: number | null;
    username: string;
    name_and_family: string;
    status: string;
    role?: string;
}[]

export type UsersTableHeaderProps = {
    id?: string;
    username: string;
    name_and_family: string;
    status: string;
    role?: string;
}