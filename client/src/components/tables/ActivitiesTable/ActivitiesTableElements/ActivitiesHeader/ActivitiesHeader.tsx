import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ActivitiesTableHeader } from '@/types/table-types/activitiesTableTypes'

const activityHeaderItems: ActivitiesTableHeader = {
    items: [
        {
            activity: 'Activity',
            measure: 'Measures',
        }
    ]
}

const ActivitiesHeader = () => {
    return (
        <TableHeader>
            {activityHeaderItems.items.map((item, i) => (
                <TableRow key={i}>
                    {Object.keys(item).map((key, i) => (
                        key !== 'id' && (
                            <TableHead className='text-center' key={i}>
                                {item[key as keyof typeof item]}
                            </TableHead>
                        )
                    ))}
                </TableRow>
            ))}
        </TableHeader>
    )
}

export default ActivitiesHeader