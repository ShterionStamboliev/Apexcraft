import { useMediaQuery } from 'usehooks-ts'
import SidebarMobile from './SidebarMobile/SidebarMobile';
import SidebarDesktop from './SidebarDesktop/SidebarDesktop';

const Sidebar = () => {
    const onDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <>
            <aside className="min-h-screen max-w-xs flex flex-col border-r px-4 py-8 md:min-w-[220px] md:px-0">
                {onDesktop
                    ? (
                        <SidebarDesktop />
                    )
                    : (
                        <SidebarMobile />
                    )
                }
            </aside>
        </>
    );
}

export default Sidebar