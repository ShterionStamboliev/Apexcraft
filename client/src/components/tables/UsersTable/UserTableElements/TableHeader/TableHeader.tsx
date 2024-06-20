import {
    TableHeader as Header,
    TableRow,
    TableHead
} from "@/components/ui/table"
import { UsersTableHeaderProps } from "@/types/table-types/userTableTypes"

const tableHeaderItems: UsersTableHeaderProps = {
    items: [
        {
            name_and_family: 'Име, Фамилия',
            username: 'Потребител',
            status: 'Статус',
            role: 'Роля'
        }
    ]
}

const TableHeader = () => {
    return (
        <Header>
            {tableHeaderItems.items.map((item, i) => (
                <TableRow key={i}>
                    {Object.keys(item).map((key, i) => (
                        key !== 'id' && (
                            <TableHead key={i}>
                                {item[key as keyof typeof item]}
                            </TableHead>
                        )
                    ))}
                </TableRow>
            ))}
        </Header>
    )
}

export default TableHeader