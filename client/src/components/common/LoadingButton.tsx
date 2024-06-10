import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

type LoadingButtonProps = {
    label: string;
};

const LoadingButton = ({ label }: LoadingButtonProps) => {
    return (
        <Button className='w-full px-6' disabled>
            <Loader2 className='font-semibold animate-spin' />
            {label}
        </Button>
    );
};

export default LoadingButton