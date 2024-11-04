import CreateMeasure from '@/components/forms/measures-form/MeasureFormCreate/CreateMeasure'
import MeasuresTableBody from '@/components/tables/MeasuresTable/MeasuresTableBody'

const MeasuresTable = () => {
    return (
        <div className="flex flex-col flex-1 pr-2 py-8 items-center md:px-0">
            <div className='w-full mb-4'>
                <CreateMeasure />
            </div>
            <MeasuresTableBody />
        </div>
    );
};

export default MeasuresTable;