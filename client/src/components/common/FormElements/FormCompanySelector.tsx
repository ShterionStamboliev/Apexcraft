import useCompanyApi from '@/components/api/companies/companiesApi'
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
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Company } from '@/types/company-types/companyTypes'
import { TableFormSelectType } from '@/types/table-types/tableTypes'
import { useFormContext } from 'react-hook-form'

const CompanySelector = ({ label, name, placeholder, defaultVal }: TableFormSelectType) => {
    const { control } = useFormContext();

    const { getCompanies } = useCompanyApi();
    const { data } = useFetchQuery<Company[]>(['companies'], getCompanies, {
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
                            {data && data.map((company) => (
                                <SelectItem
                                    key={company.id}
                                    value={company.name}
                                >
                                    {company.name}
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