import { Button } from '@/components/ui/button';

type DesktopViewButtonsProps = {
    handleEditClick: (userId: number | undefined) => void;
    handleDisableClick: (userId: number | undefined) => void;
    userId: number | undefined;
}

const DesktopViewButtons = ({ handleEditClick, handleDisableClick, userId }: DesktopViewButtonsProps) => {
    return (
        <>
            <Button
                type="button"
                variant="outline"
                onClick={() => handleEditClick(userId)}
                className="h-9 px-4 py-1 mr-2 border rounded-md"
            >
                Edit
            </Button>
            <Button
                className="mr-2"
                variant="outline"
                onClick={() => handleDisableClick(userId)}
            >
                Deactivate
            </Button>
        </>
    )
}

export default DesktopViewButtons