import Sidebar from '../components/Sidebar/Sidebar';
import ArtisansTableBody from '../components/Tables/ArtisansTable/ArtisansTableBody';

const ArtisansTablePage = () => {
    return (
        <div className='flex md:gap-60 min-h-screen'>
            <Sidebar />
            <div className='flex-1 flex px-2 md:gap-8'>
                <ArtisansTableBody />
            </div>
        </div>
    );
};

export default ArtisansTablePage;
