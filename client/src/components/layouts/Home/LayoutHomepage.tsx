import LayoutHeader from '@/components/layouts/Header/LayoutHeader';
import LayoutFooter from '@/components/layouts/Footer/LayoutFooter';

type LayoutHomepageProps = {
    children: React.ReactNode;
};

const LayoutHomepage = ({ children }: LayoutHomepageProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <LayoutHeader />

            <div className="flex-1">
                {children}
            </div>

            <LayoutFooter />
        </div>
    );
}

export default LayoutHomepage