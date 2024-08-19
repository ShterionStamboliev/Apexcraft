import { useMediaQuery } from 'usehooks-ts';
import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const DialogTriggerButtons = () => {
    const onDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <>
            {onDesktop
                ? <DialogTrigger asChild>
                    <Button
                        className='border border-slate-800'
                        variant={'ghost'}
                        size={'icon'}
                    >
                        <Plus />
                    </Button>
                </DialogTrigger>
                : <DialogTrigger asChild>
                    <Button
                        className='border border-slate-800 overflow-x-auto'
                        variant={'ghost'}
                        size={'icon'}
                    >
                        <Plus />
                    </Button>
                </DialogTrigger>
            }
        </>
    )
}

export default DialogTriggerButtons