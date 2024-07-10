import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger

} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Edit } from 'lucide-react';

type MobileViewButtonsProps = {
    handleEditClick: (userId: number) => void;
    handleDisableClick: (userId: number) => void;
    id: number;
}

const MobileViewButtons = ({
    handleEditClick,
    handleDisableClick,
    id,
}: MobileViewButtonsProps) => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} onClick={() => handleEditClick(id)}>
                        <Edit size={25} />
                    </Button>
                </DropdownMenuTrigger>
                {/* <DropdownMenuContent className='flex flex-col p-2 text-center min-w-[4rem] cursor-pointer'>
                    <DropdownMenuCheckboxItem onClick={() => handleEditClick(id)}>
                        {/* <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Edit size={25} />
                                </TooltipTrigger>
                                <TooltipContent side='left'>
                                    <p>Edit user</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider> */}
                    {/* </DropdownMenuCheckboxItem> */}
                {/* </DropdownMenuContent> */}
            </DropdownMenu>
        </>
    )
}

export default MobileViewButtons