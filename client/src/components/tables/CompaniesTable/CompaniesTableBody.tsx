import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import CompaniesLoader from '@/components/utils/SkeletonLoader/Companies/CompaniesLoader';
import { Building2, CircleAlert } from 'lucide-react';
import CompaniesCard from './CompaniesCard';
import CompaniesHeader from './CompanyTableElements/CompaniesHeader/CompaniesHeader';
import { useGetPaginatedData } from '@/components/hooks/custom-hooks/useQueryHook';
import { Company } from '@/types/company-types/companyTypes';
import useSearchParamsHook from '@/components/hooks/custom-hooks/useSearchParamsHook';
import Pagination from '@/components/common/Pagination/Pagination';

const CompaniesTableBody = () => {
    const { setSearchParams, itemsLimit, page } = useSearchParamsHook();
    
    const { data: companies, isPending, isError, error } = useGetPaginatedData<Company>({
        URL: '/companies',
        queryKey: ['companies', page],
        limit: itemsLimit,
        page
    });

    const totalPages: number | undefined = companies?.totalPages;

    if (isPending) {
        return <CompaniesLoader companies={companies} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            error={`${error.message}. Please try again.`}
            Icon={CircleAlert}
        />
    };

    return (
        <>
            <Table className='w-full min-w-full'>
                <CompaniesHeader />
                <TableBody>
                    {
                        companies.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className='text-center text-3xl'>
                                    <NoResultsFound
                                        title='No companies found'
                                        description="It looks like you haven't added any companies yet."
                                        Icon={Building2}
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <CompaniesCard
                                companies={companies}
                            />
                        )
                    }
                </TableBody>
            </Table>
            <Pagination
                page={page}
                setSearchParams={setSearchParams}
                totalPages={totalPages}
            />
        </>
    )
}

export default CompaniesTableBody