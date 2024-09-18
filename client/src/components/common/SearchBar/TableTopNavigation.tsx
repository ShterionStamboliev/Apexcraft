import React, { SetStateAction } from 'react'
import SearchBar from './SearchBar';

type TableTopNavigationProps = {
    searchQuery: string;
    setSearchQuery: React.Dispatch<SetStateAction<string>>;
    Component: React.ComponentType;
}

const TableTopNavigation = ({
    searchQuery,
    setSearchQuery,
    Component
}: TableTopNavigationProps) => {
    return (
        <div className='flex gap-4 md:gap-16'>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <div className='flex gap-4'>
                <Component />
            </div>
        </div>
    )
}

export default TableTopNavigation;