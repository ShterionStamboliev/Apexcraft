import CreateCompany from '@/components/forms/companies-form/CompanyFormCreate/CreateCompany'
import CompaniesTableBody from '@/components/tables/CompaniesTable/CompaniesTableBody'

const CompaniesTable = () => {
    return (
        <div className="flex flex-col flex-1 py-8 items-center md:px-0">
            <div className='w-full mb-4'>
                <CreateCompany />
            </div>
            <CompaniesTableBody />
        </div>
    );
};

export default CompaniesTable;