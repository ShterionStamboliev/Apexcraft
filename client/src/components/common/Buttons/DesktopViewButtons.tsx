import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Edit, UserX } from 'lucide-react';

type DesktopViewButtonsProps = {
    handleEditClick: (userId: number) => void;
    handleDisableClick: (userId: number) => void;
    id: number;
}

const DesktopViewButtons = ({
    handleEditClick,
    handleDisableClick,
    id
}: DesktopViewButtonsProps) => {
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => handleEditClick(id)}
                            className="mr-2"
                        >
                            <Edit />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side='left'>
                        <p>Edit user</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            onClick={() => handleDisableClick(id)}
                        >
                            <UserX />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side='right'>
                        <p>Deactivate user</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
}

export default DesktopViewButtons