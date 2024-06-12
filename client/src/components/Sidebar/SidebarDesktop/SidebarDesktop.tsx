import SidebarLinks from '../SidebarComponents/SidebarLinks';
import { sidebarItems } from '../SidebarComponents/sidebarItems';

const SidebarDesktopLinks = () => {
    return (
        <>
            <aside className="w-[250px] h-screen max-w-xs flex flex-col border-r py-8">
                <SidebarLinks sidebarItems={sidebarItems} />
            </aside>
        </>
    );
}

export default SidebarDesktopLinks