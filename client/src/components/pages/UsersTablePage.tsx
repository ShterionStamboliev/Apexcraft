import Sidebar from '../Sidebar/Sidebar';
import UsersTable from '../tables/UsersTable/UsersTable';

const UsersTablePage = () => {

    return (
        <div className="flex gap-2">
            <Sidebar />
            
            <UsersTable />
        </div>
    );
}

export default UsersTablePage