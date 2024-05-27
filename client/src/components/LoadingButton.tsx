import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

const LoadingButton = () => {
    return (
        <Button disabled>
            <Loader2 className='mt-4 h-4 w-4 animate-spin'/>
            Signing in...
        </Button>
    )
}

export default LoadingButton