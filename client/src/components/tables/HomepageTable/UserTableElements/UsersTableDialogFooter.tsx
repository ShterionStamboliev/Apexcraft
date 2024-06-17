import LoadingButton from '@/components/common/LoadingButton';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type UsersTableDialogFooterProps = {
    isLoading: boolean | undefined;
    label: string;
    type?: "submit" | "reset" | "button" | undefined;
    formName: string;
    className?: string;
}

const UsersTableDialogFooter = ({ isLoading, label, type, formName, className }: UsersTableDialogFooterProps) => {

    return (
        <DialogFooter>
            {isLoading ? (
                <LoadingButton label='Добавете' />
            ) : (
                <Button
                    type={type}
                    form={formName}
                    className={cn("font-semibold w-full mt-2", className)}
                    variant='outline'
                >
                    {label}
                </Button>
            )}
        </DialogFooter>
    )
}

export default UsersTableDialogFooter