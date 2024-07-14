import Sidebar from '../Sidebar/Sidebar';
import CompaniesTable from '../tables/CompaniesTable/CompaniesTable';

const CompaniesTablePage = () => {
    return (
        <div className="flex gap-2 md:gap-8">
            <Sidebar />

            <CompaniesTable />
        </div>
    );
}

export default CompaniesTablePage