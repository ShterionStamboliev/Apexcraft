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
}

interface FetchDataQueryOptions<TData> extends FetchQueryOptions {
    options?: UseFetchQueryOptions<TData>
}
interface UseGetPaginatedDataTypes extends FetchQueryOptions {
    page: number,
    limit?: number,
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
        queryFn: () => getPaginatedData<TData>(URL, page, limit!),
        staleTime: 0,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData
    });
};

export const useGetInfiniteData = <TData>({
    URL,
    queryKey,
}: FetchQueryOptions
): UseInfiniteQueryResult<TData> => {
    return useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({ pageParam = 1 }) => getInfiniteData<TData[]>(URL, pageParam),
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

export const useFetchDataQuery = <TData>({
    URL,
    queryKey,
    options,
}: FetchDataQueryOptions<TData>
): UseQueryResult<TData> => {
    return useQuery({
        queryKey,
        queryFn: () => getEntityData<TData>(URL),
        ...options
    });
};