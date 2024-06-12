import Header from "@/components/layouts/Header/LayoutHeader";
import Footer from "@/components/layouts/Footer/LayoutFooter";

type LayoutHomepageProps = {
    children: React.ReactNode;
};

const LayoutHomepage = ({ children }: LayoutHomepageProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {/* Main content */}
            <div className="flex-1">
                {children}
            </div>

            <Footer />
        </div>
    );
}

export default LayoutHomepage