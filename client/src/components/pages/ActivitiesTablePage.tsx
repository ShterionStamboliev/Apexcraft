import Sidebar from '../Sidebar/Sidebar';
import ActivitiesTable from '../tables/ActivitiesTable/ActivitiesTable';

const ActivitiesTablePage = () => {

    return (
        <div className="flex gap-2">
            <Sidebar />

            <ActivitiesTable />
        </div>
    );
}

export default ActivitiesTablePage