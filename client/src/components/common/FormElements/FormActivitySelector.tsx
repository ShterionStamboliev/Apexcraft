import useActivitiesApi from '@/components/api/activities/activitiesApi'
import { useFetchQuery } from '@/components/hooks/custom-hooks/useFetchQueryHook'
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

    const { getActivities } = useActivitiesApi();
    const { data: activities } = useFetchQuery<PaginatedActivities>(['activities'], getActivities, {
        staleTime: Infinity
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