import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LayoutMainProps = {
    children: React.ReactNode;
};

const LayoutMain = ({ children }: LayoutMainProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex-1 p-10">
                {children}
            </div>

            <Footer />
        </div>
    )
}

export default LayoutMain