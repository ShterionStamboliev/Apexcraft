import { SidebarItems } from '@/types/sidebar-types/sidebarItems'
import { Link, useLocation } from 'react-router-dom'
import SidebarButton from './SidebarButton'
import SidebarUser from './SidebarUser'

interface SidebarLinksProps {
    sidebarItems: SidebarItems
}

const SidebarLinks = ({ sidebarItems }: SidebarLinksProps) => {
    const location = useLocation();

    return (
        <>
            
            {
                sidebarItems.links.map((link, index) => (
                    <Link to={link.href} key={index} className='pb-1'>
                        <SidebarButton
                            variant={location.pathname === link.href ? 'secondary' : 'ghost'}
                            icon={link.icon}
                            className='w-full'
                        >
                            {link.label}
                        </SidebarButton>
                    </Link>
                ))
            }
            <SidebarUser />
        </>
    )
}

export default SidebarLinks