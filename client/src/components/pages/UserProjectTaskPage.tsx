import Sidebar from '../Sidebar/Sidebar'
import UserProjectTaskTableBody from '../tables/UserProjectTaskTable/UserProjectTaskTableBody'

const UserProjectTaskPage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex px-2 md:gap-8">
                <UserProjectTaskTableBody />
            </div>

        </div>
    )
}

export default UserProjectTaskPage