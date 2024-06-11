import { PopoverContent } from '@/components/ui/popover'
import { Link } from 'react-router-dom'
import SidebarButton from './SidebarButton'
import { sidebarUserItems } from './sidebarItems'

const SidebarUserDropdown = () => {
    return (
        <PopoverContent className='w-[250px] p-0'>
            <div className='py-2'>
                {sidebarUserItems.links.map((link, index) => (
                    <Link to={link.href} key={index}>
                        <SidebarButton
                            className='w-full mb-1'
                            size='sm'
                            icon={link.icon}
                        >
                            {link.label}
                        </SidebarButton>
                    </Link>
                ))}
            </div>
        </PopoverContent>
    )
}

export default SidebarUserDropdown