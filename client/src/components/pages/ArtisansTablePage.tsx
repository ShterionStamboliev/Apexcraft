import Sidebar from '../Sidebar/Sidebar';
import ArtisansTable from '../tables/ArtisansTable/ArtisansTable';

const ArtisansTablePage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex px-2 md:gap-8">
                <ArtisansTable />
            </div>
        </div>
    );
}

export default ArtisansTablePage