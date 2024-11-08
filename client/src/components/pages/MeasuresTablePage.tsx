import Sidebar from '../Sidebar/Sidebar';
import MeasuresTable from '../tables/MeasuresTable/MeasuresTable';

const MeasuresTablePage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex px-2 md:gap-8">
                <MeasuresTable />
            </div>
        </div>
    );
}

export default MeasuresTablePage