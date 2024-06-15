import { Table } from "../../ui/table"
import UsersTableHeader from "./UserTableElements/UsersTableHeader"
import UsersTableAddNew from "./UserTableElements/UsersTableAddNew"
import UsersTableDisplay from './UserTableElements/UsersTableDisplay';

const HomepageUsersTable = () => {

    return (
        <div className="flex flex-1 gap-5 py-8">

            <UsersTableAddNew />

            <Table>
                <UsersTableHeader />
                
                <UsersTableDisplay />
            </Table>
        </div>
    )
};

export default HomepageUsersTable