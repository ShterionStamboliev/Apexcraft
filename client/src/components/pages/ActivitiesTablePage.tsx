import Sidebar from '../Sidebar/Sidebar';
import ActivitiesTable from '../tables/ActivitiesTable/ActivitiesTable';

const ActivitiesTablePage = () => {
    return (
        <div className="flex gap-2 pr-2 md:gap-8">
            <Sidebar />

            <ActivitiesTable />
        </div>
    );
}

export default ActivitiesTablePage