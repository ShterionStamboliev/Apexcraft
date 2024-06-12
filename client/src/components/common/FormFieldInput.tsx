import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormInputType } from '@/types/table-types/tableTypes';
import { useFormContext } from 'react-hook-form'

const FormFieldInput = ({ label, name, type }: FormInputType) => {

    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='pt-2 flex-1'>
                    <FormLabel className='font-semibold'>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input {...field}
                            type={type}
                            // className='bg-white'
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default FormFieldInput