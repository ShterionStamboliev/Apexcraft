import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormInputType } from '@/types/table-types/tableTypes';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';

const FormFieldInput = ({
    label,
    name,
    type,
    className
}: FormInputType) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn('flex-1 pt-2', className)}>
                    <FormLabel className={cn('font-semibold', className)}>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input {...field}
                            type={type}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default FormFieldInput