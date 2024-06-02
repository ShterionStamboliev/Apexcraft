import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LayoutLoginFormProps = {
    children: React.ReactNode;
};

const LayoutLoginForm = ({ children }: LayoutLoginFormProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex-1 p-10 items-center bg-blend-darken justify-center">
                {children}
            </div>

            <Footer />
        </div>
    )
}

export default LayoutLoginForm