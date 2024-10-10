import Sidebar from '../Sidebar/Sidebar'
import UserProjectTaskTableBody from '../tables/UserProjectTaskTable/UserProjectTaskTableBody'

const UserProjectTaskPage = () => {
    return (
        <div className="flex gap-2 md:gap-8">
            <Sidebar />

            <UserProjectTaskTableBody />
        </div>
    )
}

export default UserProjectTaskPage