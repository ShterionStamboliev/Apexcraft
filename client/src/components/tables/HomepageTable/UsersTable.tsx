import { Table } from "../../ui/table"
import UsersTableHeader from "./UserTableElements/UsersTableHeader"
import UsersTableAddNew from "./UserTableElements/UsersTableAddNew"
import UsersTableDisplay from './UserTableElements/UsersTableDisplay';

const UsersTable = () => {

    return (
        <div className="flex flex-1 gap-2 py-8 overflow-x-auto md:px-0">

            <UsersTableAddNew />
            <div className='flex-1 overflow-x-auto'>

                <Table className='w-full min-w-full'>
                    <UsersTableHeader />

                    <UsersTableDisplay />
                </Table>
            </div>
        </div>
    )
};

export default UsersTable