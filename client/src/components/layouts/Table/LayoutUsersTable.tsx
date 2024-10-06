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
        </div>
    );
}

export default LayoutUsersTable