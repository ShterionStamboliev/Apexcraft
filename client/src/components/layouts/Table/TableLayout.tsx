import LayoutHeader from '../Header/LayoutHeader';

type TableLayoutProps = {
    children: React.ReactNode;
};

const TableLayout = ({ children }: TableLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <LayoutHeader />

            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
}

export default TableLayout