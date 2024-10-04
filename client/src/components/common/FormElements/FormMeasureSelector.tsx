import useMeasuresApi from '@/components/api/measures/measuresApi'
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
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Measure } from '@/types/measure-types/measureTypes'
import { TableFormSelectType } from '@/types/table-types/tableTypes'
import { useFormContext } from 'react-hook-form'

const MeasureSelector = ({ label, name, placeholder, defaultVal }: TableFormSelectType) => {
    const { control } = useFormContext();

    const { getMeasures } = useMeasuresApi();
    const { data } = useFetchQuery<Measure[]>(['measures'], getMeasures, {
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
                            <SelectGroup>
                                {data && data
                                    .map((measure) => (
                                        <SelectItem
                                            key={measure.id}
                                            value={measure.name}
                                        >
                                            {measure.name}
                                        </SelectItem>
                                    ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}

export default MeasureSelector;