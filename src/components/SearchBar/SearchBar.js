import { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="close-search" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;