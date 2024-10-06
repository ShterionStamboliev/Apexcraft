import { Table } from '@/components/ui/table'
import CreateArtisan from '@/components/forms/artisans-form/ArtisanFormCreate/CreateArtisan';
import ArtisansHeader from './ArtisansTableElements/ArtisansHeader/ArtisansHeader';
import ArtisansTableBody from '@/components/tables/ArtisansTable/ArtisansTableBody';

const ArtisansTable = () => {
    return (
        <div className="flex flex-1 py-8 overflow-x-auto md:px-0">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <CreateArtisan />
                <Table className='w-full min-w-full'>
                    <ArtisansHeader />
                    <ArtisansTableBody />
                </Table>
            </div>
        </div>
    )
};

export default ArtisansTable