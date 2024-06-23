import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext'
import { MoreHorizontal } from 'lucide-react';
import SidebarUserDropdown from '../SidebarComponents/SidebarUserDropdown';

const SidebarMobileUser = () => {
    const { user } = useAuth();

    const userAvatarFallbackLetter = user?.split('')[0].toUpperCase();

    return (
        <>
            <Separator className='mb-1' />
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant='ghost'
                        className='w-full justify-start h-9'
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
    )
}

export default SidebarMobileUser