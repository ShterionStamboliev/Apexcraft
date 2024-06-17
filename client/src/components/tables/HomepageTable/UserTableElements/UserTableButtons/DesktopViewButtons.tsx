import { Button } from '@/components/ui/button';

type DesktopViewButtonsProps = {
    handleEditClick: (userId: string | undefined) => void;
    userId: string | undefined;
}

const DesktopViewButtons = ({ handleEditClick, userId }: DesktopViewButtonsProps) => {
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
            >
                Deactivate
            </Button>
        </>
    )
}

export default DesktopViewButtons