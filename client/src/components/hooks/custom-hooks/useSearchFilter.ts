import { useMemo } from 'react';

interface FilteredData {
    name?: string;
    company_name?: string;
    name_and_family?: string;
}

function useSearchFilter<T extends FilteredData>(data: T[], searchQuery: string): T[] {
    return useMemo(() => {
        return data.filter(value => {
            return (
                (value.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (value.company_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (value.name_and_family?.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        });
    }, [data, searchQuery]);
}

export default useSearchFilter;