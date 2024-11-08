import Sidebar from '../Sidebar/Sidebar';
import ActivitiesTable from '../tables/ActivitiesTable/ActivitiesTable';

const ActivitiesTablePage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex px-2 md:gap-8">
                <ActivitiesTable />
            </div>
        </div>
    );
}

export default ActivitiesTablePage