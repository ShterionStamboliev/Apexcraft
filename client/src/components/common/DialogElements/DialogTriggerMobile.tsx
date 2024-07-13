import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { PlusSquare } from 'lucide-react'

const DialogTriggerMobile = () => {
    return (
        <>
            <DialogTrigger asChild>
                <Button
                    className='border border-zinc-800 overflow-x-auto'
                    variant={'ghost'}
                    size={'icon'}
                >
                    <PlusSquare />
                </Button>
            </DialogTrigger>
        </>
    )
}

export default DialogTriggerMobile