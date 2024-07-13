import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { PlusSquare } from 'lucide-react'

const DialogTriggerDesktop = () => {
    return (
        <>
            <DialogTrigger asChild>
                <Button
                    className='border border-zinc-800'
                    variant={'ghost'}
                    size={'icon'}
                >
                    <PlusSquare />
                </Button>
            </DialogTrigger>
        </>
    )
}

export default DialogTriggerDesktop