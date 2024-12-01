import { PaginatedDataResponse } from '@/types/query-data-types/paginatedDataTypes';

export const findItemById = <TData>(
    data: PaginatedDataResponse<TData> | TData[],
    id: string,
    getId: (item: TData) => string
): TData | undefined => {
    if (Array.isArray(data)) {
        return data.find((item) => getId(item) === id) || undefined;
    }
    return data.data.find((item) => getId(item) === id) || undefined;
};
