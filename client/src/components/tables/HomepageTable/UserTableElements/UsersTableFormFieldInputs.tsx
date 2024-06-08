import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TableFormInputsType } from '@/types/table-types/tableTypes';
import { useFormContext } from 'react-hook-form'

const UsersTableFormFieldInputs = ({ label, name, type }: TableFormInputsType) => {

    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='pt-4'>
                    <FormLabel className='font-semibold'>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input {...field}
                            type={type}
                            className='bg-white'
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default UsersTableFormFieldInputs