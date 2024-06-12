import { useAuth } from "@/context/AuthContext";
import SidebarDesktopLinks from '../Sidebar/SidebarDesktop/SidebarDesktop';

const Homepage = () => {

    // const { user, logout, isLoading, role } = useAuth();

    return (
        <div className="flex gap-5">

            <SidebarDesktopLinks />

        </div>
    );
}

export default Homepage