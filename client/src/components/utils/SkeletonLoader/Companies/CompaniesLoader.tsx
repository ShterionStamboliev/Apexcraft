import CompaniesHeader from '@/components/tables/CompaniesTable/CompanyTableElements/CompaniesHeader/CompaniesHeader'
import { Table, TableBody } from "../../../ui/table"
import CompaniesSkeleton from './CompaniesSkeleton'
import { Company } from '@/types/company-types/companyTypes'

type CompanyProps = {
    companies: Company[];
}

const CompaniesLoader = ({ companies }: CompanyProps) => {
    return (
        <Table className='w-full min-w-full'>
            <CompaniesHeader />
            <TableBody>
                {companies && Array.from({ length: companies.length }).map((_, i) => (
                    <CompaniesSkeleton key={i} />
                ))
                }
            </TableBody>
        </Table>
    )
}

export default CompaniesLoader