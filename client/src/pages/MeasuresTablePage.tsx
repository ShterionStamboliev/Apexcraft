import Sidebar from '../components/Sidebar/Sidebar';
import MeasuresTableBody from '../components/Tables/MeasuresTable/MeasuresTableBody';

const MeasuresTablePage = () => {
    return (
        <div className='flex md:gap-60 min-h-screen'>
            <Sidebar />

            <div className='flex-1 flex px-2 md:gap-8'>
                <MeasuresTableBody />
            </div>
        </div>
    );
};

export default MeasuresTablePage;
