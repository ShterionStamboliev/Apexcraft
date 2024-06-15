import LoadingButton from '@/components/common/LoadingButton';
import { Button } from '@/components/ui/button';

type UserLoginFormButtonsProps = {
    isLoading: boolean | undefined;
}

const UserFormButtons = ({ isLoading }: UserLoginFormButtonsProps) => {
    return (
        <>
            {isLoading ? (
                <LoadingButton label="Вход" />
            ) : (
                <Button
                    form='login-form'
                    className="font-semibold w-full">
                    Вход
                </Button>
            )}
        </>
    )
}

export default UserFormButtons