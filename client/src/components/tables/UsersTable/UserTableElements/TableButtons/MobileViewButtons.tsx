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
    handleEditClick: (userId: number | undefined) => void;
    handleDisableClick: (userId: number | undefined) => void;
    userId: number | undefined;
}

const MobileViewButtons = ({ handleEditClick, handleDisableClick, userId }: MobileViewButtonsProps) => {
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
                        Настройки
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className='mt-2' />
                    <DropdownMenuCheckboxItem onClick={() => handleEditClick(userId)}>
                        Edit
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem onClick={() => handleDisableClick(userId)}>
                        Deactivate
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default MobileViewButtons