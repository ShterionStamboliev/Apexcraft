import CreateActivity from '@/components/forms/activities-form/ActivityFormCreate/CreateActivity'
import ActivitiesTableBody from './ActivitiesTableBody';

const ActivitiesTable = () => {
    return (
        <div className="flex flex-col flex-1 py-8 items-center md:px-0">
            <div className='w-full mb-4'>
                <CreateActivity />
            </div>
            <div className='flex flex-col justify-center items-center min-w-full'>
                <ActivitiesTableBody />
            </div>
        </div>
    )
};

export default ActivitiesTable