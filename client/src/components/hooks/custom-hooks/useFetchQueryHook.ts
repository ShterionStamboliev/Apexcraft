import {
    MutationFunction,
    QueryFunctionContext,
    QueryKey,
    useMutation,
    UseMutationOptions,
    UseMutationResult,
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

export const useMutationQuery = <TData, TVariables = void>(
    mutationFunc: MutationFunction<TData, TVariables>,
    options?: UseMutationOptions<TData, unknown, TVariables>
): UseMutationResult<TData, unknown, TVariables> => {
    return useMutation({
        mutationFn: mutationFunc,
        ...options
    });
};