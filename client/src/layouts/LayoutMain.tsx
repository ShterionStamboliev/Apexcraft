import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";

type LayoutMainProps = {
    children: React.ReactNode;
};

const LayoutMain = ({ children }: LayoutMainProps) => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex p-1">
        <div className="w-300" style={{ width: "200px" }}>
    <SideBar />
  </div>

  {/* Main content */}
  <div className="flex-1 pl-1 p-1">
    {children}
  </div>
</div>

        <Footer />
      </div>
    );
}

export default LayoutMain