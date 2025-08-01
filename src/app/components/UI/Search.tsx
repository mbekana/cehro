'use client';

import React, { useState } from 'react';
import Button from './Button';  
import { FaSearch, FaTimes } from 'react-icons/fa'; 

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear: () => void;
  buttonText: string;
}

const Search: React.FC<SearchProps> = ({ placeholder = "Search...", onSearch, onClear, buttonText }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query); 
    }
  };

  const handleClearClick = () => {
    setQuery("");  
    onClear();     
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (!newQuery.trim()) {
      onClear(); 
    }
  };

  return (
    <div className="flex items-center w-full relative">
      <div className="relative w-80"> {/* Adjust width here */}
        <input
          type="text"
          id="searchInput"
          className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pr-10 pb-2.5 pt-4 text-sm text-gray-900 focus:border-2 focus:border-blue-600 focus:outline-none focus:ring-0"
          placeholder=" "
          value={query}
          onChange={handleInputChange}
        />
        <label
          htmlFor="searchInput"
          className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
        >
          {placeholder}
        </label>
        
        {query && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={handleClearClick}
          >
            <FaTimes size={16} />
          </button>
        )}
      </div>

      <Button
        color="primary"
        text={buttonText}
        onClick={handleSearch}
        icon={<FaSearch />}
        className="ml-2"
        size="large"
        borderRadius={2}
      />
    </div>
  );
};

export default Search;
