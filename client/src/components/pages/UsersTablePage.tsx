import SidebarDesktopLinks from '../Sidebar/SidebarDesktop/SidebarDesktop';
import HomepageUsersTable from '../tables/HomepageTable/HomepageUsersTable';

const UsersTablePage = () => {

    // const { user, logout, isLoading, role } = useAuth();

    return (
        <div className="flex gap-5 py-5">

            <SidebarDesktopLinks />

            <HomepageUsersTable />

        </div>
    );
}

export default UsersTablePage