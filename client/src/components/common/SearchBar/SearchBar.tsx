import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {

    return (
        <div className='relative flex items-center mb-6 w-[20vw] min-w-[200px] max-w-[260px]'>
            <Input
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                placeholder='Search...'
                type='text'
                className='w-full pl-10 pr-3 py-2 b-none focus-visible:ring-transparent focus-visible:border-zinc-500' />
            <Search size={20} className='absolute left-3 text-zinc-500' />
        </div>
    )
}

export default SearchBar