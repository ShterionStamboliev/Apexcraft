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
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { TableFormSelectType } from '@/types/table-types/tableTypes'
import { User } from '@/types/user-types/userTypes'
import { useFormContext } from 'react-hook-form'
import { PaginatedData } from '../Pagination/Pagination'

const UsersSelector = ({ label, name, placeholder, defaultVal }: TableFormSelectType) => {
    const { control } = useFormContext();
    const { data: users } = useFetchDataQuery<PaginatedData<User>>({
        URL: '/users',
        queryKey: ['users'],
        options: {
            staleTime: Infinity
        },
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
                                    users && users.data
                                        .map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.name_and_family}
                                            >
                                                {user.name_and_family}
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

export default UsersSelector;