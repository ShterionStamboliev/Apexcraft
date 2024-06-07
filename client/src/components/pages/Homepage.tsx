import { useAuth } from "@/context/AuthContext";
import HomepageUsersTable from "../tables/HomepageTable/HomepageUsersTable";
import SidebarDesktopLinks from '../Sidebar/SidebarDesktop/SidebarDesktop';

const Homepage = () => {

    // const { user, logout, isLoading, role } = useAuth();

    return (
        <div className="flex gap-5 py-5">

            <SidebarDesktopLinks />

            <HomepageUsersTable />

        </div>
    );
}

export default Homepage