import LoadingButton from '@/components/common/LoadingButton';
import { Button } from '@/components/ui/button';

type UserLoginFormButtonsProps = {
    isLoading: boolean | undefined;
}

const UserLoginFormButtons = ({ isLoading }: UserLoginFormButtonsProps) => {
    return (
        <>
            {isLoading ? (
                <LoadingButton label="Вход" />
            ) : (
                <Button
                    form='login-form'
                    className="bg-zinc-950 font-semibold w-full hover:bg-zinc-800">
                    Вход
                </Button>
            )}
        </>
    )
}

export default UserLoginFormButtons