import { Home, Info, Table, Users } from 'lucide-react';
import SidebarLinks from '../SidebarComponents/SidebarLinks';
import { SidebarItems } from '@/types/sidebar-types/sidebarItems';

const sidebarItems: SidebarItems = {
    links: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Tables', href: '/tables', icon: Table },
        { label: 'Users', href: '/users', icon: Users },
        { label: 'About', href: '/about', icon: Info },
    ]
};

const SidebarDesktopLinks = () => {
    return (
        <>
            <aside className="w-[250px] h-screen max-w-xs flex flex-col border-r">
                <SidebarLinks sidebarItems={sidebarItems} />
            </aside>
        </>
    );
}

export default SidebarDesktopLinks