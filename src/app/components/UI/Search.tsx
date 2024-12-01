'use client';

import React, { useState } from 'react';
import Input from './Input';  
import Button from './Button';  
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  buttonText: string;
}

const Search: React.FC<SearchProps> = ({ placeholder = "Search...", onSearch, buttonText }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query); 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="grid grid-cols-2 gap-2 items-center">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        name="search"
        className="col-span-4 w-full"  
      />

      <Button
        color="primary"
        text={buttonText}
        onClick={handleSearch}
        icon={<FaSearch />}
        className="col-span-1" 
        size='large'
        borderRadius={2}
      />
    </div>
  );
};

export default Search;
