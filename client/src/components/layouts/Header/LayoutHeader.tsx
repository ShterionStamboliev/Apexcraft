import SidebarUserDropdown from '@/components/Sidebar/SidebarComponents/SidebarUserDropdown';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';
import { Link } from "react-router-dom";

const LayoutHeader = () => {
    const { user } = useAuth();

    return (
        <>
            <div className="py-4 w-full">
                <div className="w-full flex justify-between items-center px-12 mx-auto">
                    <div>
                        <Link to='/' className="flex">
                            <span className="text-2xl text-zinc-500 font-bold tracking-tight hover:text-zinc-700 hover:cursor-pointer dark:hover:text-zinc-400 duration-200">
                                Project-34
                            </span>
                        </Link>
                    </div>
                    <div className='flex items-center'>
                        <div className='pr-2'>
                            {user && (
                                <>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='ghost'
                                                className='p-1.5'
                                            >
                                                <div className='flex justify-between items-center w-full'>
                                                    <div className='flex gap-2 w-full items-center'>
                                                        <span className='text-md'>{user}</span>
                                                        <User />
                                                    </div>
                                                </div>
                                            </Button>
                                        </PopoverTrigger>
                                        <SidebarUserDropdown />
                                    </Popover>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Separator />
        </>
    )
}

export default LayoutHeader