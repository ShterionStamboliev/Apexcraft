import { Table } from '@/components/ui/table'
import CompaniesHeader from './CompanyTableElements/CompaniesHeader/CompaniesHeader'
import CreateCompany from '@/components/forms/companies-form/CompanyFormCreate/CreateCompany'
import CompaniesTableBody from '@/components/tables/CompaniesTable/CompaniesTableBody'

const CompaniesTable = () => {
    return (
        <div className="flex flex-1 py-8 overflow-x-auto md:px-0">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <CreateCompany />
                <Table className='w-full min-w-full'>
                    <CompaniesHeader />
                    <CompaniesTableBody />
                </Table>
            </div>
        </div>
    );
};

export default CompaniesTable;