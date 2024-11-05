import { useFetchDataQuery } from '@/components/hooks/custom-hooks/useQueryHook'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { PaginatedActivities } from '@/types/activity-types/activityTypes'
import { TableFormSelectType } from '@/types/table-types/tableTypes'
import { useFormContext } from 'react-hook-form'

const ActivitySelector = ({ label, name, placeholder, defaultVal }: TableFormSelectType) => {
    const { control } = useFormContext();

    const { data: activities } = useFetchDataQuery<PaginatedActivities>({
        URL: '/activities',
        queryKey: ['activities'],
        options: {
            staleTime: Infinity
        }
    });

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className='font-semibold'>
                        {label}
                    </FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={defaultVal}
                    >
                        <FormControl>
                            <SelectTrigger className='w-[140px]'>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {
                                activities && activities.data
                                    .map((activity) => (
                                        <SelectItem
                                            key={activity.id}
                                            value={activity.name}
                                        >
                                            {activity.name}
                                        </SelectItem>
                                    ))
                            }
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}

export default ActivitySelector;