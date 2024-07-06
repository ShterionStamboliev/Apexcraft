import { Button } from '@/components/ui/button';

type DesktopViewButtonsProps = {
    handleEditClick: (userId?: number) => void;
    handleDisableClick: (userId?: number) => void;
    id?: number;
}

const DesktopViewButtons = ({
    handleEditClick,
    handleDisableClick,
    id
}: DesktopViewButtonsProps) => {
    return (
        <>
            <Button
                type="button"
                variant="outline"
                onClick={() => handleEditClick(id)}
                className="h-9 px-4 py-1 mr-2 border rounded-md"
            >
                Edit
            </Button>
            <Button
                className="mr-2"
                variant="outline"
                onClick={() => handleDisableClick(id)}
            >
                Deactivate
            </Button>
        </>
    )
}

export default DesktopViewButtons