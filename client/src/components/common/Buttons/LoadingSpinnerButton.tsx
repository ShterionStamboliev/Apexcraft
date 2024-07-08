import { Button } from '@/components/ui/button';
import LoaderButton from './LoaderButton';

type UserLoginFormButtonsProps = {
    isLoading: boolean | undefined;
}

const LoadingSpinnerButton = ({ isLoading }: UserLoginFormButtonsProps) => {
    return (
        <>
            {isLoading ? (
                <LoaderButton
                    label="Вход"
                />
            ) : (
                <Button
                    form='login-form'
                    className="font-semibold w-full"
                    variant='outline'
                >
                    Вход
                </Button>
            )}
        </>
    )
}

export default LoadingSpinnerButton