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
                    className="bg-zinc-950 font-semibold w-full hover:bg-zinc-800 mt-2"
                >
                    Добавете
                </Button>
            )}
        </DialogFooter>
    )
}

export default UsersTableDialogFooter