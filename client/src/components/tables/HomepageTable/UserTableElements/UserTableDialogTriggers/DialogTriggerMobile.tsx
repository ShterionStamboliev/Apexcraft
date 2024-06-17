import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { SquarePlus } from 'lucide-react'

const DialogTriggerMobile = () => {
    
    return (
        <>
            <DialogTrigger asChild>
                <Button
                    className='fixed left-4 top-36'
                    variant={'ghost'}
                    size={'icon'}
                >
                    <SquarePlus className='text-zinc-400' />
                </Button>
            </DialogTrigger>
        </>
    )
}

export default DialogTriggerMobile