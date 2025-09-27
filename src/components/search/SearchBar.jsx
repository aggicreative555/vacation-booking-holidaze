import { useEffect, useRef, useState } from 'react';
import { showToast } from '../../utils/toast';
import { useDebounce } from '../../hooks/useDebounce';
import { Search } from 'lucide-react';
import { toast } from 'react-toastify';

const SearchBar = ({ data = [], onResults }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);
  const errorToast = useRef(false);

  // dismiss error on empty search field
  toast.dismiss(showToast.error);

  useEffect(() => {
    if (!debouncedQuery) {
      onResults?.(data);
      setSuggestions([]);
      return;
    }

    const results = data.filter((item) => 
    item?.name.toLowerCase().includes(debouncedQuery.toLowerCase()));

    setSuggestions(results.slice(0, 3));
    onResults?.(results);

    if (results.length === 0 && !errorToast.current) {
      showToast.error('No venues match your search. Please try again');
      errorToast.current = true;
      setTimeout(() => (errorToast.current = false), 1000);
    }
    
}, [debouncedQuery, data, onResults]);

useEffect(() => {
  const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target))
        setIsFocused(false);
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestions = (name) => {
    setQuery(name);
    setSuggestions([]);

    const selected = data.filter(
      (item) => item?.name.toLowerCase().includes(name.toLowerCase())
    );

    onResults?.(selected);
  };

  return (
    <div
      ref={wrapperRef}
      className="w-full flex justify-between items-center max-w-[500px] mx-auto px-2 py-4 relative z-10 border-b border-dark hover:border-b-2 focus:border-none group transition-all duration-300 ease-in-out"
    >
      <input
        type="search"
        placeholder="What are you looking for today?"
        className="uppercase text-brown-400 text-base font-garamond break-words text-wrap w-full font-medium tracking-wide overflow-visible p-3 focus:bg-gray-200 focus:outline-none appearence-none group-hover:tracking-wider focus:normal-case focus:italic transition-all duration-300 ease-in-out md:text-base"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        aria-label="Search venues"
        onFocus={() => setIsFocused(true)}
      />
      <Search className='group-hover:scale-110 transition-all duration-300'/>
      {isFocused && suggestions.length > 0 && (
        <ul className="text-sm absolute left-0 right-0 top-14 mt-1 pt-2 pb-5 bg-white border-b-[1px] border-gray-300 font-caslon font-light italic z-10 max-h-60 overflow-y-auto transition-all duration-300 ease-in-out">
          {suggestions.map((item) => (
            <li
              key={item?.id}
              className="px-6 py-2 hover:bg-brown-100 hover:tracking-wider cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => handleSuggestions(item?.name)}
            >
              {item?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
