import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

type UsersTableDialogFooterProps = {
    label: string;
}

const UsersTableDialogFooter = ({ label = 'Добавете' }: UsersTableDialogFooterProps) => {
    return (
        <DialogFooter>
            <Button
                type='submit'
                form='user-form'
                className="bg-zinc-950 font-semibold w-full hover:bg-zinc-800 mt-5"
            >
                {label}
            </Button>
        </DialogFooter>
    )
}

export default UsersTableDialogFooter