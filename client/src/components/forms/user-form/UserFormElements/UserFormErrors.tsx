type UserLoginFormErrorsProps = {
    error: string | undefined;
}

const UserFormErrors = ({ error }: UserLoginFormErrorsProps) => {
    return (
        <>
            {error && (
                <div className="text-red-500 font-semibold mt-4 text-center">
                    {error}
                </div>
            )}
        </>
    )
}

export default UserFormErrors