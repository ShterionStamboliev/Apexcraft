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
                ))
            }
        </>
    )
}

export default CompaniesCard