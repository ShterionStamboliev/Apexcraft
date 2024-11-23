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
        <div className="flex flex-col flex-1 py-8">
            <div className='flex flex-col flex-1 py-8 items-center md:px-0'>
                <div className='flex flex-col-reverse md:flex-col-reverse lg:flex-row gap-4 w-full mb-4 justify-center'>
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
                </div>
            </div>
        </div>
    )
}

export default CompaniesLoader