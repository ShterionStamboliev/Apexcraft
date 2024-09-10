import LoaderButton from '@/components/common/Buttons/LoaderButton';
import { Button } from '@/components/ui/button';
import { DialogFooter as Footer } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type DialogFooterProps = {
    isLoading?: boolean | undefined;
    label: string;
    type?: "submit" | "reset" | "button" | undefined;
    formName: string;
    className?: string;
}

const DialogFooter = ({
    isLoading,
    label,
    type,
    formName,
    className
}: DialogFooterProps) => {

    return (
        <Footer>
            {isLoading ? (
                <LoaderButton label='Submit' />
            ) : (
                <Button
                    type={type}
                    form={formName}
                    className={cn("bg-blue-600 hover:bg-blue-800 font-semibold w-full mt-2 border-none", className)}
                    variant='outline'
                >
                    {label}
                </Button>
            )}
        </Footer>
    )
}

export default DialogFooter