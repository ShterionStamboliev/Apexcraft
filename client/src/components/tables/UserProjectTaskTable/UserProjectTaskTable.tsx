import UserProjectTaskTableBody from './UserProjectTaskTableBody'

const UserProjectTaskTable = () => {
    return (
        <div className="flex flex-col flex-1 py-8 items-center md:px-0">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <div className='flex flex-row flex-wrap gap-5'>
                    <UserProjectTaskTableBody />
                </div>
            </div>
        </div>
    )
}

export default UserProjectTaskTable