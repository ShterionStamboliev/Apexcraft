import useCompaniesQuery from '@/components/api/companies/companiesQuery';
import EditCompanyForm from '@/components/forms/companies-form/CompanyFormEdit/EditCompany';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import CompaniesLoader from '@/components/utils/SkeletonLoader/Companies/CompaniesLoader';

const CompaniesTableBody = () => {
    const { useGetCompanies } = useCompaniesQuery();
    const { data: companies, isPending, isError, error } = useGetCompanies();

    if (isPending) {
        return <CompaniesLoader />
    };

    if (isError) {
        return <div>Error: {error.message}</div>
    };

    return (
        <TableBody>
            {companies.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={4} className='text-center text-3xl'>
                        No results found
                    </TableCell>
                </TableRow>
            ) : (
                companies.map((company, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            {company.name}
                        </TableCell>
                        <TableCell className='text-center'>
                            {company.number}
                        </TableCell>
                        <TableCell className='text-center'>
                            {company.mol}
                        </TableCell>
                        <TableCell className="text-end w-[200px]">
                            <EditCompanyForm
                                company={company}
                                companyId={company.id!}
                            />
                        </TableCell>
                    </TableRow>
                )))}
        </TableBody>
    )
}

export default CompaniesTableBody