import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>ZataakSe</h1>
        </div>

        <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
          <a href="/" className="navbar-item active" onClick={handleClick}>Home</a>
          <div className="navbar-item dropdown">
            <span>Pages</span>
            <div className="dropdown-content">
              <a href="/page1" onClick={handleClick}>Page 1</a>
              <a href="/page2" onClick={handleClick}>Page 2</a>
            </div>
          </div>
          <div className="navbar-item dropdown">
            <span>Shop</span>
            <div className="dropdown-content">
              <a href="/shop1" onClick={handleClick}>Shop 1</a>
              <a href="/shop2" onClick={handleClick}>Shop 2</a>
            </div>
          </div>
          <div className="navbar-item dropdown">
            <span>Blog</span>
            <div className="dropdown-content">
              <a href="/blog1" onClick={handleClick}>Blog 1</a>
              <a href="/blog2" onClick={handleClick}>Blog 2</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <button className="search-toggle" onClick={toggleSearch}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="navbar-item">
            <a href="/account" onClick={handleClick}>
              <i className="fas fa-user"></i>
            </a>
          </div>
          <div className="navbar-item">
            <a href="/cart" onClick={handleClick}>
              <i className="fas fa-shopping-cart"></i>
            </a>
          </div>
        </div>
      </div>
      {isSearchOpen && <SearchBar onSearch={onSearch} onClose={toggleSearch} />}
    </nav>
  );
};

export default Navbar;