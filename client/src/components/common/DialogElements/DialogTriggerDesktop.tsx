import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { UserPlus } from 'lucide-react'

const DialogTriggerDesktop = () => {
    return (
        <>
            <DialogTrigger asChild>
                <Button
                    className='w-15 h-10'
                    variant={'ghost'}
                    size={'sm'}
                >
                    <UserPlus />
                </Button>
            </DialogTrigger>
        </>
    )
}

export default DialogTriggerDesktop