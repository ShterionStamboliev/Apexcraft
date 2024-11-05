import { useFetchQuery } from '@/components/hooks/custom-hooks/useQueryHook'
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
import { PaginatedCompanies } from '@/types/company-types/companyTypes'
import { TableFormSelectType } from '@/types/table-types/tableTypes'
import { useFormContext } from 'react-hook-form'

const CompanySelector = ({ label, name, placeholder, defaultVal }: TableFormSelectType) => {
    const { control } = useFormContext();

    const { data: companies } = useFetchQuery<PaginatedCompanies>(['companies'], '/companies', {
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
                            {
                                companies && companies.data.filter(company => company.status === 'active')
                                    .map((company) => (
                                        <SelectItem
                                            key={company.id}
                                            value={company.name}
                                        >
                                            {company.name}
                                        </SelectItem>
                                    ))
                            }
                        </SelectContent>
                    </Select>
                </FormItem>
            )}
        />
    )
}

export default CompanySelector