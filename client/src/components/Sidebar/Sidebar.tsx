import { useMediaQuery } from 'usehooks-ts'
import SidebarMobile from './SidebarMobile/SidebarMobile';
import SidebarDesktop from './SidebarDesktop/SidebarDesktop';

const Sidebar = () => {
    const onDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <>
            <div className='relative min-h-[100vh]'>
                <aside className="max-w-xs flex flex-col border-r px-4 py-8 md:min-w-[220px] md:px-0">
                    {onDesktop
                        ? <SidebarDesktop />
                        : <SidebarMobile />
                    }
                </aside>
                <div className='absolute top-0 right-0 h-full border-r' />
            </div>
        </>
    );
}

export default Sidebar