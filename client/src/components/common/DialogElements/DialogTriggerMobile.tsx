import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { UserPlus } from 'lucide-react'

const DialogTriggerMobile = () => {
    return (
        <>
            <DialogTrigger asChild>
                <Button
                    className='absolute left-4 top-36'
                    variant={'ghost'}
                    size={'icon'}
                >
                    <UserPlus />
                </Button>
            </DialogTrigger>
        </>
    )
}

export default DialogTriggerMobile