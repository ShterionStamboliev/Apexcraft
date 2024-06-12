import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { SquarePlus } from 'lucide-react'

const UsersTableDialogTrigger = () => {
    return (
        <>
            <DialogTrigger asChild>
                <Button
                    className='w-15 h-10 border border-zinc-200 hover:bg-zinc-300'
                    variant={'outline'}
                    size={'sm'}
                >
                    <SquarePlus className='text-zinc-400' />
                </Button>
            </DialogTrigger>
        </>
    )
}

export default UsersTableDialogTrigger