import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

const LoadingButton = () => {
    return (
        <Button className='w-full px-6' disabled>
            <Loader2 className='font-semibold animate-spin'/>
            Вход
        </Button>
    )
}

export default LoadingButton