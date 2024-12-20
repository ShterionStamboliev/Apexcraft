import Sidebar from '../components/Sidebar/Sidebar';
import CompaniesTableBody from '../components/Tables/CompaniesTable/CompaniesTableBody';

const CompaniesTablePage = () => {
    return (
        <div className='flex md:gap-60 min-h-screen'>
            <Sidebar />

            <div className='flex-1 flex px-2 md:gap-8'>
                <CompaniesTableBody />
            </div>
        </div>
    );
};

export default CompaniesTablePage;
