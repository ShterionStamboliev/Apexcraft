import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

type DialogTriggerButtonCreateProps = {
    text: string;
}

const DialogTriggerButtonCreate = ({ text }: DialogTriggerButtonCreateProps) => {
    return (
        <DialogTrigger asChild>
            <Button className='w-full lg:max-w-[15rem]' variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                <span className='font-bold'>{text}</span>
            </Button>
        </DialogTrigger>
    )
}

export default DialogTriggerButtonCreate