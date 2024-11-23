import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react'

type DialogTriggerButtonCreateProps = {
    text: string;
    className?: string;
}

const DialogTriggerButtonCreate = ({ text, className }: DialogTriggerButtonCreateProps) => {
    return (
        <DialogTrigger asChild>
            <Button className={cn('w-full lg:max-w-[15rem]', className)} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                <span className='font-bold'>{text}</span>
            </Button>
        </DialogTrigger>
    )
}

export default DialogTriggerButtonCreate