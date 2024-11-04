import useCompaniesQuery from '@/components/api/companies/companiesQuery';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import CompaniesLoader from '@/components/utils/SkeletonLoader/Companies/CompaniesLoader';
import { Building2, CircleAlert } from 'lucide-react';
import CompaniesCard from './CompaniesCard';
import CompaniesHeader from './CompanyTableElements/CompaniesHeader/CompaniesHeader';

const CompaniesTableBody = () => {
    const { useGetCompanies } = useCompaniesQuery();
    const { data: companies, isPending, isError, error } = useGetCompanies();

    if (isPending) {
        return <CompaniesLoader companies={companies!} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            error={`${error.message}. Please try again.`}
            Icon={CircleAlert}
        />
    };

    return (
        <Table className='w-full min-w-full'>
            <CompaniesHeader />
            <TableBody>
                {
                    companies.length === 0 ? (
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
    )
}

export default CompaniesTableBody