import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger

} from '@/components/ui/dropdown-menu'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

type MobileViewButtonsProps = {
    handleEditClick: (userId?: number) => void;
    handleDisableClick: (userId?: number) => void;
    id?: number;
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
                    <Button variant={'ghost'}>
                        <DotsVerticalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='flex flex-col p-2 text-center'>
                    <DropdownMenuLabel className='p-0'>
                        Options
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className='mt-2' />
                    <DropdownMenuCheckboxItem onClick={() => handleEditClick(id)}>
                        Edit
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem onClick={() => handleDisableClick(id)}>
                        Deactivate
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default MobileViewButtons