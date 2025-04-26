import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  label?: string;
  value?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search posts...',
  label,
  value: externalValue,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(externalValue || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  // Update internal value when external value changes
  React.useEffect(() => {
    if (externalValue !== undefined) {
      setSearchQuery(externalValue);
    }
  }, [externalValue]);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-[#333333]">
          {label}
        </label>
      )}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="h-[40px] w-full rounded-[8px] border border-[#999999] pr-10 pl-10 text-[14px] leading-[100%] font-normal focus:ring-2 focus:ring-[#7695EC] focus:outline-none"
        />
        <button
          type="submit"
          className="absolute top-1/2 left-3 -translate-y-1/2 transform text-[#777777]"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform text-[#777777] hover:text-[#555555]"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
