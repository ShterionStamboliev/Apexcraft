import { getEntityData, getPaginatedData } from '@/components/api/apiCall';
import {
    QueryKey,
    useQuery,
    UseQueryOptions,
    UseQueryResult
} from '@tanstack/react-query';

type UseFetchQueryOptions<TData> = Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>;

export type PaginatedDataResponse<TData> = {
    data: TData[];
    limit?: number;
    total?: number;
    totalPages?: number;
}

export const useGetPaginatedData = <TData>(
    URL: string,
    page: number,
    limit: number
): UseQueryResult<PaginatedDataResponse<TData>> => {
    return useQuery({
        queryKey: [URL, page],
        queryFn: () => getPaginatedData<TData>(URL, page, limit),
        staleTime: 0,
        refetchInterval: false,
        refetchOnWindowFocus: false
    });
};

export const useFetchQuery = <TData>(
    queryKey: QueryKey,
    URL: string,
    options?: UseFetchQueryOptions<TData>
): UseQueryResult<TData> => {
    return useQuery({
        queryKey,
        queryFn: () => getEntityData<TData>(URL),
        ...options,
    });
};