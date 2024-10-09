import useUsersApi from '@/components/api/users/usersApi'
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
import { TableFormSelectType } from '@/types/table-types/tableTypes'
import { User } from '@/types/user-types/userTypes'
import { useFormContext } from 'react-hook-form'

const UsersSelector = ({ label, name, placeholder, defaultVal }: TableFormSelectType) => {
    const { control } = useFormContext();

    const { getUsers } = useUsersApi();
    const { data: users } = useFetchQuery<User[]>(['users'], getUsers, {
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
                                {users && users
                                    .map((user) => (
                                        <SelectItem
                                            key={user.id}
                                            value={user.name_and_family}
                                        >
                                            {user.name_and_family}
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

export default UsersSelector;