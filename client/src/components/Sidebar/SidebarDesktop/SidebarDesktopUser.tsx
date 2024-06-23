import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { MoreHorizontal } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import SidebarUserDropdown from '../SidebarComponents/SidebarUserDropdown'

const SidebarDesktopUser = () => {
    const { user } = useAuth();

    const userAvatarFallbackLetter = user?.split('')[0].toUpperCase();

    return (
        <>
            {user && (
                <>
                    <Separator className='mt-1' />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant='ghost'
                                className='w-full justify-start h-9 px-4 mt-2'
                            >
                                <div className='flex justify-between items-center w-full'>
                                    <div className='flex gap-2 w-full items-center'>
                                        <Avatar className='h-7 w-7'>
                                            <AvatarImage />
                                            <AvatarFallback>
                                                {userAvatarFallbackLetter}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>{user}</span>
                                    </div>
                                    <MoreHorizontal size={20} />
                                </div>
                            </Button>
                        </PopoverTrigger>

                        <SidebarUserDropdown />
                    </Popover>
                </>
            )}
        </>
    )
}

export default SidebarDesktopUser