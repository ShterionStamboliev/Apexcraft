import TableLoadingPage from "@/components/utils/UsersTableLoader/TableLoadingPage"
import { Table } from "../../ui/table"
import UsersTableHeader from "./UserTableElements/UsersTableHeader"
import UsersTableBody from "./UserTableElements/UsersTableBody"
import { dummyUsers } from "./dummyData"
import UsersTableAddNew from "./UserTableElements/UsersTableAddNew"

const HomepageUsersTable = () => {

    return (
        <div className="flex flex-1 gap-5">

            <UsersTableAddNew />

            <Table>
                <UsersTableHeader
                    id="ID"
                    username="Потребител"
                    name_and_family="Име, Фамилия"
                    status="Статус"
                    role="Роля"
                >
                </UsersTableHeader>

                <TableLoadingPage />
                
                <UsersTableBody
                    userData={dummyUsers}>
                </UsersTableBody>
            </Table>
        </div>
    )
};

export default HomepageUsersTable