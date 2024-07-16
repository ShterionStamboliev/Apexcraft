import { Table } from '@/components/ui/table'
import { lazy, Suspense, useState } from 'react'
import FilterDropdown from '@/components/common/Filter/FilterDropdown'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import CompaniesHeader from './CompanyTableElements/CompaniesHeader/CompaniesHeader'
import { useCompany } from '@/context/Company/CompanyContext'
import { Company } from '@/types/company-types/companyTypes'
import CreateCompany from '@/components/forms/companies-form/CompanyFormCreate/CreateCompany'
import CompaniesLoader from '@/components/utils/SkeletonLoader/Companies/CompaniesLoader'
import useSearchFilter from '@/components/hooks/custom-hooks/useSearchFilter'

const CompaniesTableBody = lazy(() => import('@/components/tables/CompaniesTable/CompaniesTableBody'))

const CompaniesTable = () => {
    const { state } = useCompany();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const filteredData = useSearchFilter<Company>(state.company, searchQuery);

    return (
        <div className="flex flex-1 py-8 overflow-x-auto md:px-0">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <div className='flex gap-24 md:gap-34'>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className='flex gap-4'>
                        <FilterDropdown />
                        <CreateCompany />
                    </div>
                </div>
                <Table className='w-full min-w-full'>
                    <CompaniesHeader />
                    <Suspense fallback={<CompaniesLoader />}>
                    <CompaniesTableBody
                        filteredData={filteredData}
                    />
                    </Suspense>
                </Table>
            </div>
        </div>
    );
};

export default CompaniesTable;