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
import { PaginatedArtisans } from '@/types/artisan-types/artisanTypes'
import { TableFormSelectType } from '@/types/table-types/tableTypes'
import { useFormContext } from 'react-hook-form'

const ArtisanSelector = ({ label, name, placeholder, defaultVal }: TableFormSelectType) => {
    const { control } = useFormContext();

    const { data: artisans } = useFetchQuery<PaginatedArtisans>(['artisans'], '/artisans', {
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
                                {
                                    artisans && artisans.data.filter(artisan => artisan.status === 'active')
                                        .map((artisan) => (
                                            <SelectItem
                                                key={artisan.id}
                                                value={artisan.name}
                                            >
                                                {artisan.name}
                                            </SelectItem>
                                        ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}

export default ArtisanSelector;