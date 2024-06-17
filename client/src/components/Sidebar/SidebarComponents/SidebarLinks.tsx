import { sidebarItems } from '../SidebarComponents/sidebarItems'
import { Link } from 'react-router-dom'
import SidebarButton from '../SidebarComponents/SidebarButton'

type SidebarComponent = {
    Component: React.ComponentType
}

const SidebarLinks = ({ Component }: SidebarComponent) => {

    return (
        <div className='min-h-full'>
            <div className='mt-1 px-2 flex flex-col w-full gap-1'>
                {sidebarItems.links.map((link, i) => (
                    <Link
                        to={link.href}
                        key={i}
                        className='pb-1'
                    >
                        <SidebarButton
                            variant={location.pathname === link.href
                                ? 'secondary'
                                : 'ghost'
                            }
                            icon={link.icon}
                            className='w-full'
                        >
                            {link.label}
                        </SidebarButton>
                    </Link>
                ))}
                <Component />
            </div>
        </div>
    )
}

export default SidebarLinks