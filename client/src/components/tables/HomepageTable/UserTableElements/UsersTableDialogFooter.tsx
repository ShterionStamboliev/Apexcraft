import LoadingButton from '@/components/common/LoadingButton';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

type UsersTableDialogFooterProps = {
    isLoading: boolean | undefined;
}

const UsersTableDialogFooter = ({ isLoading }: UsersTableDialogFooterProps) => {

    return (
        <DialogFooter>
            {isLoading ? (
                <LoadingButton label='Добавете' />
            ) : (
                <Button
                    type='submit'
                    form='user-form'
                    className="font-semibold w-full mt-2"
                    variant='outline'
                >
                    Добавете
                </Button>
            )}
        </DialogFooter>
    )
}

export default UsersTableDialogFooter