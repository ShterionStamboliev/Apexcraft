import EditCompanyForm from '@/components/forms/companies-form/CompanyFormEdit/EditCompany';
import { TableCell, TableRow } from '@/components/ui/table';
import { Company } from '@/types/company-types/companyTypes'

type CompaniesCardProps = {
    companies: Company[];
}

const CompaniesCard = ({ companies }: CompaniesCardProps) => {
    return (
        <>
            {
                companies.map((company, index) => (
                    <TableRow key={index}>
                        <TableCell className='font-semibold' >
                            {company.name}
                        </TableCell>
                        <TableCell className='text-center font-semibold'>
                            {company.number}
                        </TableCell>
                        <TableCell className='text-center font-semibold'>
                            {company.mol}
                        </TableCell>
                        <TableCell className="text-end w-[200px]">
                            <EditCompanyForm
                                company={company}
                                companyId={company.id!}
                            />
                        </TableCell>
                    </TableRow>
                ))
            }
        </>
    )
}

export default CompaniesCard