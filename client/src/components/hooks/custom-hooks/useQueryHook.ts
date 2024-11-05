import { getEntityData, getInfiniteData, getPaginatedData } from '@/components/api/apiCall';
import {
    keepPreviousData,
    QueryKey,
    useInfiniteQuery,
    UseInfiniteQueryResult,
    useQuery,
    UseQueryOptions,
    UseQueryResult
} from '@tanstack/react-query';

type UseFetchQueryOptions<TData> = Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>;

interface FetchQueryOptions {
    URL: string,
    queryKey: QueryKey,
    limit: number,
}

interface UseGetPaginatedDataTypes extends FetchQueryOptions {
    page: number,
    limit: number,
}

export type PaginatedDataResponse<TData> = {
    data: TData[];
    limit?: number;
    total?: number;
    totalPages?: number;
}

export const useGetPaginatedData = <TData>({
    URL,
    queryKey,
    limit,
    page
}: UseGetPaginatedDataTypes
): UseQueryResult<PaginatedDataResponse<TData>> => {
    return useQuery({
        queryKey: queryKey,
        queryFn: () => getPaginatedData<TData>(URL, page, limit),
        staleTime: 0,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData
    });
};

export const useGetInfiniteData = <TData>({ // TODO: ...use this in work items list
    URL,
    queryKey,
    limit
}: FetchQueryOptions
): UseInfiniteQueryResult<TData> => {
    return useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({ pageParam = 1 }) => getInfiniteData<TData[]>(URL, pageParam, limit),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return pages.length + 1;
        },
        staleTime: 0
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