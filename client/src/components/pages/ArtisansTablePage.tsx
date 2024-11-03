import Sidebar from '../Sidebar/Sidebar';
import ArtisansTable from '../tables/ArtisansTable/ArtisansTable';

const ArtisansTablePage = () => {
    return (
        <div className="flex gap-2 pr-2 md:gap-8">
            <Sidebar />

            <ArtisansTable />
        </div>
    );
}

export default ArtisansTablePage