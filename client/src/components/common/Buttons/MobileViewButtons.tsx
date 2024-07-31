import { Button } from '@/components/ui/button'
import {
    DropdownMenu,

    DropdownMenuTrigger

} from '@/components/ui/dropdown-menu'
import { Edit } from 'lucide-react';

type MobileViewButtonsProps = {
    handleEditClick: (userId: number) => void;
    handleDisableClick: (userId: number) => void;
    id: number;
}

const MobileViewButtons = ({
    handleEditClick,
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
            </DropdownMenu>
        </>
    )
}

export default MobileViewButtons