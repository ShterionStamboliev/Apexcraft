type UserLoginFormHeaderProps = {
    title: string;
    description: string;
}

const UserFormHeader = ({ title, description }: UserLoginFormHeaderProps) => {
    return (
        <div className="text-center mb-6">
            <h1 className='text-3xl font-bold'>
                {title}
            </h1>
            <p>
                {description}
            </p>
        </div>
    )
}

export default UserFormHeader