import { Input } from '@/components/ui/input';

type SearchBarProps = {
    search: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const SearchBar = ({ search, placeholder, handleSearch }: SearchBarProps) => {
    return (
        <Input
            type='text'
            placeholder={placeholder}
            value={search}
            onChange={handleSearch}
            className='mb-4 focus-visible:ring-blue-700 transition focus:ease-in-out duration-300 md:max-w-xs '
        />
    )
};

export default SearchBar;
