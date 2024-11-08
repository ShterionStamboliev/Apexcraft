import Sidebar from '../Sidebar/Sidebar';
import UsersTable from '../tables/UsersTable/UsersTable';

const UsersTablePage = () => {
    return (
        <div className="flex gap-2 pr-2 md:gap-8">
            <Sidebar />
            
            <UsersTable />
        </div>
    );
}

export default UsersTablePage