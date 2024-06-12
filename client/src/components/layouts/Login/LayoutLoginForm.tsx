import LayoutFooter from '@/components/layouts/Footer/LayoutFooter';

type LayoutLoginFormProps = {
    children: React.ReactNode;
};

const LayoutLoginForm = ({ children }: LayoutLoginFormProps) => {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="flex-1 p-10 items-center justify-center">
                {children}
            </div>

            <LayoutFooter />
        </div>
    )
}

export default LayoutLoginForm