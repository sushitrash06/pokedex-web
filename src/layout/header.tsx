// layout/header.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../context/seacrh-context';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { searchKeyword, setSearchKeyword } = useSearch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 p-4 transition-all duration-300 ${
        isScrolled ? 'bg-white bg-opacity-80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Search Input (Visible on "/" path only) */}
        {location.pathname === '/' && (
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="w-2/3 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        )}

        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            alt="PokeAPI Logo"
            className="h-10 lg:h-12"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
