import LayoutFooter from '../Footer/LayoutFooter';
import LayoutHeader from '../Header/LayoutHeader';

type LayoutUsersTableProps = {
    children: React.ReactNode;
};

const LayoutUsersTable = ({ children }: LayoutUsersTableProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <LayoutHeader />

            <div className="flex-1 overflow-hidden">
                {children}
            </div>

            {/* <LayoutFooter /> */}
        </div>
    );
}

export default LayoutUsersTable