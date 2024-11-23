import Sidebar from '../Sidebar/Sidebar';
import CompaniesTableBody from '../tables/CompaniesTable/CompaniesTableBody';

const CompaniesTablePage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex px-2 md:gap-8">
                <CompaniesTableBody />
            </div>
        </div>
    );
}

export default CompaniesTablePage