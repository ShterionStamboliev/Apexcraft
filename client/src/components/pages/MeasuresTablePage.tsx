import Sidebar from '../Sidebar/Sidebar';
import MeasuresTable from '../tables/MeasuresTable/MeasuresTable';

const MeasuresTablePage = () => {

    return (
        <div className="flex gap-2">
            <Sidebar />

            <MeasuresTable />
        </div>
    );
}

export default MeasuresTablePage