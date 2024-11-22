import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

export type UseFetchQueryOptions<TData> = Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>;

export interface FetchQueryOptions {
    URL: string,
    queryKey: QueryKey,
}

export interface FetchDataQueryOptions<TData> extends FetchQueryOptions {
    options?: UseFetchQueryOptions<TData>
}

export interface UseGetPaginatedDataTypes extends FetchQueryOptions {
    page: number,
    limit?: number,
    search?: string;
}

export type PaginatedDataResponse<TData> = {
    data: TData[];
    limit?: number;
    total?: number;
    totalPages?: number;
}