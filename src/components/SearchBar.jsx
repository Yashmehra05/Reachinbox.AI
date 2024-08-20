import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = ({ currColor }) => {
    return (
        <div className={`border border-gray-400 rounded h-7 ${currColor ? 'bg-[#23272C]' : 'bg-white'} flex items-center gap-2`}>
            <Search color='gray' className='w-5 h-5 ml-1' />
            <input
                type="text"
                placeholder='Search'
                className={`outline-none ${currColor ? 'bg-[#23272C] text-white' : 'bg-white text-black'}`}
                aria-label="Search"
            />
        </div>
    );
};

export default SearchBar;
