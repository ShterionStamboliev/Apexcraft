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
import { useActivity } from '@/context/Activity/ActivityContext'
import { TableFormSelectType } from '@/types/table-types/tableTypes'
import { useFormContext } from 'react-hook-form'

const ActivitySelector = ({ label, name, placeholder, defaultVal }: TableFormSelectType) => {
    const { state } = useActivity();
    const { control } = useFormContext();

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
                            {state.data
                                .filter((activity) => activity.id)
                                .map((activity) => (
                                    <SelectItem
                                        key={activity.id}
                                        value={activity.name}
                                    >
                                        {activity.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}

export default ActivitySelector;