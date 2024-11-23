import Sidebar from '../Sidebar/Sidebar';
import UsersTableBody from '../tables/UsersTable/UsersTableBody';

const UsersTablePage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex px-2 md:gap-8">
                <UsersTableBody />
            </div>
        </div>
    );
}

export default UsersTablePage