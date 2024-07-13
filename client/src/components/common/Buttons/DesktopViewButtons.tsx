import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Edit, UserX } from 'lucide-react';

type DesktopViewButtonsProps = {
    handleEditClick: (userId: number) => void;
    handleDisableClick: (userId: number) => void;
    hoverLabel: string;
    id: number;
}

const DesktopViewButtons = ({
    handleEditClick,
    handleDisableClick,
    hoverLabel,
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
                        <p>Edit {hoverLabel}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {/* <TooltipProvider>
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
                        <p>Deactivate {hoverLabel}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider> */}
        </>
    )
}

export default DesktopViewButtons