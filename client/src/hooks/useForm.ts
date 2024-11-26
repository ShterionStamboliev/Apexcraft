import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { ZodType } from 'zod';

export const useFormSchema = <T extends FieldValues>(
    schema: ZodType<T>,
    defaultValues: DefaultValues<T>,
    options: Omit<UseFormProps<T>, 'resolver' | 'defaultValues'> = {}
) => {
    const form = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
        mode: 'onChange',
        ...options
    });

    return form;
}