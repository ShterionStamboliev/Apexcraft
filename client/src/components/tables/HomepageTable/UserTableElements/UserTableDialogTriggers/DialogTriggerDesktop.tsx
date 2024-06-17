import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { SquarePlus } from 'lucide-react'

const DialogTriggerDesktop = () => {
    return (
        <>
            <DialogTrigger asChild>
                <Button
                    className='w-15 h-10'
                    variant={'ghost'}
                    size={'sm'}
                >
                    <SquarePlus className='text-zinc-400' />
                </Button>
            </DialogTrigger>
        </>
    )
}

export default DialogTriggerDesktop