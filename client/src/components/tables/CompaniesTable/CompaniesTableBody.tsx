import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import CompaniesLoader from '@/components/utils/SkeletonLoader/Companies/CompaniesLoader';
import { Building2, CircleAlert } from 'lucide-react';
import CompaniesCard from './CompaniesCard';
import CompaniesHeader from './CompanyTableElements/CompaniesHeader/CompaniesHeader';
import { useGetPaginatedData } from '@/components/hooks/custom-hooks/useQueryHook';
import { Company } from '@/types/company-types/companyTypes';
import useSearchParamsHook from '@/components/hooks/custom-hooks/useSearchParamsHook';
import Pagination from '@/components/common/Pagination/Pagination';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import CreateCompany from '@/components/forms/companies-form/CompanyFormCreate/CreateCompany';
import useSearchHandler from '@/components/hooks/custom-hooks/useSearchHandler';
import ConditionalRenderer from '@/components/common/ConditionalRenderer/ConditionalRenderer';

const CompaniesTableBody = () => {
    const { setSearchParams, itemsLimit, page } = useSearchParamsHook();

    const { search, handleSearch, debounceSearchTerm } = useSearchHandler({ setSearchParams });

    const { data: companies, isPending, isError } = useGetPaginatedData<Company>({
        URL: '/companies',
        queryKey: ['companies'],
        limit: itemsLimit,
        page,
        search: debounceSearchTerm
    });

    const totalPages: number | undefined = companies?.totalPages;

    if (isPending) {
        return <CompaniesLoader companies={companies} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            Icon={CircleAlert}
        />
    };

    return (
        <div className='flex flex-col flex-1 py-8 items-center md:px-0'>
            <div className='flex flex-col-reverse md:flex-col-reverse lg:flex-row gap-4 w-full mb-4 md:w-2/3 justify-between'>
                <SearchBar
                    handleSearch={handleSearch}
                    placeholder='Search companies...'
                    search={search}
                />
                <CreateCompany />
            </div>
            <Table className='w-full min-w-full'>
                <CompaniesHeader />
                <TableBody>
                    <ConditionalRenderer
                        data={companies.data}
                        renderData={(companies) => <CompaniesCard companies={companies} />}
                        noResults={{
                            title: 'No companies found',
                            description: "It looks like you haven't added any companies yet.",
                            Icon: Building2,
                        }}
                        wrapper={(content) => (
                            <TableRow>
                                <TableCell colSpan={4} className='text-center text-3xl'>
                                    {content}
                                </TableCell>
                            </TableRow>
                        )}
                    />
                </TableBody>
            </Table>
            <Pagination
                page={page}
                setSearchParams={setSearchParams}
                totalPages={totalPages}
            />
        </div>
    )
}

export default CompaniesTableBody