import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useCompany } from '@/context/Company/CompanyContext'
import { TableFormSelectType } from '@/types/table-types/tableTypes'
import { useFormContext } from 'react-hook-form'

const CompanySelector = ({ label, name, placeholder, defaultVal }: TableFormSelectType) => {
    const { state } = useCompany();
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='pt-2'>
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
                            {state.company
                                .filter((company) => company.id)
                                .map((company) => (
                                    <SelectItem
                                        key={company.id}
                                        value={company.company_name}
                                    >
                                        {company.company_name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}

export default CompanySelector