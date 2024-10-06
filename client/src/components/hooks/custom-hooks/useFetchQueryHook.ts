import {
    QueryFunctionContext,
    QueryKey,
    useQuery,
    UseQueryOptions,
    UseQueryResult
} from '@tanstack/react-query';

type UseFetchQueryOptions<TData> = Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>;

export const useFetchQuery = <TData>(
    queryKey: QueryKey,
    queryFunc: (context: QueryFunctionContext<QueryKey>) => Promise<TData>,
    options?: UseFetchQueryOptions<TData>
): UseQueryResult<TData> => {
    return useQuery({
        queryKey,
        queryFn: queryFunc,
        ...options,
    })
};