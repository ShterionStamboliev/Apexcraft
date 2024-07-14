import { Table } from '@/components/ui/table'
import { lazy, Suspense, useEffect, useState } from 'react'
import FilterDropdown from '@/components/common/Filter/FilterDropdown'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import CompaniesHeader from './CompanyTableElements/CompaniesHeader/CompaniesHeader'
import { useCompany } from '@/context/Companies/CompanyContext'
import { Company } from '@/types/company-types/companyTypes'
import CreateCompany from '@/components/forms/companies-form/CompanyFormCreate/CreateCompany'
import CompaniesLoader from '@/components/utils/SkeletonLoader/Companies/CompaniesLoader'

const CompaniesTableBody = lazy(() => import('@/components/tables/CompaniesTable/CompaniesTableBody'))

const CompaniesTable = () => {
    const { state } = useCompany();
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filteredData, setFilteredData] = useState<Company[]>(state.company);

    useEffect(() => {
        const fetchSearchResults = () => {
            if (searchQuery.trim() === '') {
                setFilteredData(state.company);
                return;
            }
            const filterData = state.company.filter((value) => {
                return value.company_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            });
            setFilteredData(filterData);
        }
        fetchSearchResults();

    }, [searchQuery, state.company]);

    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
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