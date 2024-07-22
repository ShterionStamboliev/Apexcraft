import { useMediaQuery } from 'usehooks-ts';
import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusSquare } from 'lucide-react';

const DialogTriggerButtons = () => {
    const onDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <>
            {onDesktop
                ? <DialogTrigger asChild>
                    <Button
                        className='border border-zinc-800'
                        variant={'ghost'}
                        size={'icon'}
                    >
                        <PlusSquare />
                    </Button>
                </DialogTrigger>
                : <DialogTrigger asChild>
                    <Button
                        className='border border-zinc-800 overflow-x-auto'
                        variant={'ghost'}
                        size={'icon'}
                    >
                        <PlusSquare />
                    </Button>
                </DialogTrigger>
            }
        </>
    )
}

export default DialogTriggerButtons