import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { PopoverContent } from '@radix-ui/react-popover'
import { Link } from 'react-router-dom'
import SidebarButton from './SidebarButton'
import { MoreHorizontal, User } from 'lucide-react'

const SidebarUser = () => {
    return (
        <>
            <Separator className='mt-5' />

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant='ghost' className='w-full justify-start h-10 px-4'>
                        <div className='flex justify-between items-center w-full'>
                            <div className='flex gap-2 w-full items-center'>
                                <Avatar className='h-7 w-7'>
                                    <AvatarImage />
                                    <AvatarFallback>P</AvatarFallback>
                                </Avatar>
                                <span>Peter Peter</span>
                            </div>
                            <MoreHorizontal size={20} />
                        </div>
                    </Button>
                </PopoverTrigger>

                <PopoverContent className='w-[225px]'>
                    <div className='py-2'>
                        <Link to='/'>
                            <SidebarButton className='w-full' size='sm' icon={User}>
                                Профил
                            </SidebarButton>
                        </Link>
                        <Separator />
                        <Link to='/logout'>
                            <SidebarButton className='w-full' size='sm' icon={User}>
                                Изход
                            </SidebarButton>
                        </Link>
                    </div>
                </PopoverContent>
            </Popover>
            <Separator />
        </>
    )
}

export default SidebarUser