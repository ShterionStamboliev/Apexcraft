import Sidebar from '../Sidebar/Sidebar';
import UsersTable from '../tables/UsersTable/UsersTable';

const UsersTablePage = () => {
    return (
        <div className="flex md:gap-60 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex px-2 md:gap-8">
                <UsersTable />
            </div>
        </div>
    );
}

export default UsersTablePage