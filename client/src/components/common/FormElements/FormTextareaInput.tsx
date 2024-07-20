import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form';
import { FormInputType } from '@/types/table-types/tableTypes';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

const FormTextareaInput = ({
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
                <FormItem className={cn('pt-2 flex-1', className)}>
                    <FormLabel className={cn('font-semibold', className)}>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder='Project notes...'
                            className='resize-none'
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export default FormTextareaInput