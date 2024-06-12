import { DialogHeader } from '@/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'

type UsersTableDialogHeaderProps = {
    title: string;
}

const UsersTableDialogHeader = ({ title = 'Добавете нов потребител' }: UsersTableDialogHeaderProps) => {
    return (
        <>
            <DialogHeader>
                <DialogTitle className='text-center font-semibold'>
                    {title}
                </DialogTitle>
            </DialogHeader>
        </>
    )
}

export default UsersTableDialogHeader