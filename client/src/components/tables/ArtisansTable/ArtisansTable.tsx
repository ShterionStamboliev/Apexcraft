import CreateArtisan from '@/components/forms/artisans-form/ArtisanFormCreate/CreateArtisan';
import ArtisansTableBody from '@/components/tables/ArtisansTable/ArtisansTableBody';

const ArtisansTable = () => {
    return (
        <div className="flex flex-col flex-1 py-8 items-center md:px-0">
            <div className='w-full mb-4'>
                <CreateArtisan />
            </div>
            <ArtisansTableBody />
        </div>
    )
};

export default ArtisansTable