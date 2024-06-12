type UserLoginFormHeaderProps = {
    title: string;
    description: string;
}

const UserLoginFormHeader = ({ title, description }: UserLoginFormHeaderProps) => {
    return (
        <div className="text-center mb-6">
            <h1 className='text-3xl font-bold'>
                {title}
            </h1>
            <p className="text-gray-500">
                {description}
            </p>
        </div>
    )
}

export default UserLoginFormHeader