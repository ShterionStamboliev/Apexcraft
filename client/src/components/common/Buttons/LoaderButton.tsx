import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type LoadingButtonProps = {
    label: string;
};

const LoaderButton = ({ label }: LoadingButtonProps) => {
    return (
        <Button className='w-full px-6' disabled>
            <Loader2 className='font-semibold animate-spin' />
            {label}
        </Button>
    );
};

export default LoaderButton;