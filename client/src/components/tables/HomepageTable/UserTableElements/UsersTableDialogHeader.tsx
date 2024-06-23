import { DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'

type UsersTableDialogHeaderProps = {
    title: string;
    user?: string;
}

const UsersTableDialogHeader = ({ title = 'Добавете нов потребител', user }: UsersTableDialogHeaderProps) => {
    return (
        <>
            <DialogHeader>
                <DialogTitle className='text-center font-semibold text-lg'>
                    {title}
                </DialogTitle>
                <DialogDescription className='text-center font-semibold text-md'>
                    {user}
                </DialogDescription>
            </DialogHeader>
        </>
    )
}

export default UsersTableDialogHeader