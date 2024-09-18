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
import { useArtisan } from '@/context/Artisan/ArtisanContext'
import { TableFormSelectType } from '@/types/table-types/tableTypes'
import { useFormContext } from 'react-hook-form'

const ArtisanSelector = ({ label, name, placeholder, defaultVal }: TableFormSelectType) => {
    const { state } = useArtisan();
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
                            <SelectGroup>
                                {state.data
                                    .filter((artisan) => artisan.id)
                                    .map((artisan) => (
                                        <SelectItem
                                            key={artisan.id}
                                            value={artisan.name}
                                        >
                                            {artisan.name}
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

export default ArtisanSelector;