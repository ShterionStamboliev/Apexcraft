import Sidebar from '../Sidebar/Sidebar';
import MeasuresTable from '../tables/MeasuresTable/MeasuresTable';

const MeasuresTablePage = () => {
    return (
        <div className="flex gap-2 md:gap-8">
            <Sidebar />

            <MeasuresTable />
        </div>
    );
}

export default MeasuresTablePage