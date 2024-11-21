import CompaniesHeader from '@/components/tables/CompaniesTable/CompanyTableElements/CompaniesHeader/CompaniesHeader'
import { Table, TableBody } from "../../../ui/table"
import CompaniesSkeleton from './CompaniesSkeleton'
import { Company } from '@/types/company-types/companyTypes'

type CompanyProps = {
    companies: Company[] | undefined;
}

const CompaniesLoader = ({ companies }: CompanyProps) => {
    const companiesCount = companies ? companies.length : 10;

    return (
        <Table className='w-full min-w-full'>
            <CompaniesHeader />
            <TableBody>
                {
                    Array.from({ length: companiesCount }).map((_, i) => (
                        <CompaniesSkeleton key={i} />
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default CompaniesLoader